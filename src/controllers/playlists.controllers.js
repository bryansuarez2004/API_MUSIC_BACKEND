const catchError = require('../utils/catchError');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const { createTrack } = require('./track.controllers');

const getAll = catchError(async(req, res) => {
    const results = await Playlist.findAll({include:[Track]});
    return res.json(results);
});

const createPlaylist = catchError(async(req,res)=>{
    
   const {idUser, tracks, name} = req.body

   if(tracks.length === 0) return  res.json({error:'debe haber almenos una cancion para crear una playlist'})

    const playlist = await Playlist.create({name,userId:idUser});

   const TracksOfPlaylist = await Promise.all(
    tracks.map(async (track) => {
      const result = await createTrack(track);
      return result;
    })
  );

  const idsOfTracks = TracksOfPlaylist.map((track)=>{
  return track.id
  })

  await playlist.setTracks(idsOfTracks)


  res.json(playlist)

})

const removePlaylist = catchError(async(req,res)=>{
    
    const {idUser} = req.body
  
           const {id} = req.params

    const result = await Playlist.destroy({where:{id,userId:idUser} });
 
   res.json(result)
 
 })

const getPlaylistWithTracks = catchError(async(req,res)=>{
    const {id} = req.params

    const result = await Playlist.findOne({where:{id},include:[Track]});
    if(!result) return res.sendStatus(404);

    res.json(result)
}) 

module.exports = {
    getAll,
    createPlaylist,
    removePlaylist,
    getPlaylistWithTracks
}