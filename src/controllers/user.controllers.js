const catchError = require('../utils/catchError');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const { createTrack } = require('./track.controllers');
const { getTrackByIdSpotify } = require('../services/tracks');
const { default: axios } = require('axios');
const { getConfig } = require('../utils/configSpotyApi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async(req, res) => {
    const results = await User.findAll({include:[Playlist,Track]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    const body = {...req.body, password: hashedPassword}


    const result = await User.create(body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});






const addFavoriteTracks = catchError(async(req,res)=>{

    const {spotifyId}=req.params
  const {id:userId} = req.user

 
    const user = await User.findByPk(userId)
    if(!user) return res.status(404).json({ error: "usuario no encontrado" })
 
    const track = await createTrack(spotifyId)


    await user.addTracks([track.id])
    
    const newTrack = await   getTrackByIdSpotify(track.spotifyId)    
 
    return res.json(newTrack)
 
 })

 const removeFavoriteTracks = catchError(async(req,res)=>{
    const {spotifyId}=req.params
  const {id:userId} = req.user


    const user = await User.findByPk(userId)
    if(!user) return res.status(404).json({ error: "usuario no encontrado" })
  
    const trackToRemove = await Track.findOne({where:{spotifyId}})

    await user.removeTracks([trackToRemove.id])

    res.json(trackToRemove)


 })


 const getFavoritesTracks = catchError(async(req,res)=>{
    const {id:userId} = req.user

 
    const user = await User.findByPk(userId)
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


 const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: {email} });
    if(!user) return res.status(401).json({ error: "Invalid credentials"})

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({ error: "Invalid credentials"});

    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:'1d'}
     )

     const body  = {...user.dataValues,token}
   
     delete body.password
      
    return res.status(201).json(body);
})

 

module.exports = {
    getAll,
    create,
    getOne,
    addFavoriteTracks,
    removeFavoriteTracks,
    getFavoritesTracks,
    login
}