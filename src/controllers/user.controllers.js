const catchError = require('../utils/catchError');
const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const { createTrack } = require('./track.controllers');

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
 
    const track = await createTrack(spotifyId)


    await user.addTracks([track.id])
    
    const tracks = await user.getTracks()
 
    return res.json(tracks)
 
 })

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    addFavoriteTracks
}