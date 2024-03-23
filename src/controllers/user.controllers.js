const catchError = require('../utils/catchError');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const { createTrack } = require('./track.controllers');
const { getTrackByIdSpotify } = require('../services/tracks');
const { default: axios } = require('axios');
const { getConfig } = require('../utils/configSpotyApi');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll({include:[Playlist,Track]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await User.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


const addFavoriteTracks = catchError(async(req,res)=>{

    const {id,spotifyId}=req.params
 
    const user = await User.findByPk(id)
    if(!user) return res.status(404).json({ error: "usuario no encontrado" })
 
    const track = await createTrack(spotifyId)


    await user.addTracks([track.id])
    
    const newTrack = await   getTrackByIdSpotify(track.spotifyId)    
 
    return res.json(newTrack)
 
 })

 const removeFavoriteTracks = catchError(async(req,res)=>{
    const {id,spotifyId}=req.params

    const user = await User.findByPk(id)
    if(!user) return res.status(404).json({ error: "usuario no encontrado" })
  
    const trackToRemove = await Track.findOne({where:{spotifyId}})

    await user.removeTracks([trackToRemove.id])

    res.json(trackToRemove)


 })


 const getFavoritesTracks = catchError(async(req,res)=>{
    const {id}=req.params
 
    const user = await User.findByPk(id)
    if(!user) return res.status(404).json({ error: "usuario no encontrado" })

    const tracks = await user.getTracks()
    if (tracks.length === 0) res.json([])


    const spotifyIds = tracks.map((track)=>{
        return track.spotifyId
    }).join(",");

    const config = await getConfig();

    const { data } = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${spotifyIds}`,
        config
      );


    res.json(data.tracks)
   


 })

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    addFavoriteTracks,
    removeFavoriteTracks,
    getFavoritesTracks
}