const catchError = require('../utils/catchError');
const Playlist = require('../models/Playlist');
const Track = require('../models/Track');
const { createTrack } = require('./track.controllers');
const { default: axios } = require('axios');
const { getConfig } = require('../utils/configSpotyApi');

const getAll = catchError(async(req, res) => {
  const {id:userId} = req.user


    const results = await Playlist.findAll({where:{userId},include:[Track]});
    return res.json(results);
});

const createPlaylist = catchError(async(req,res)=>{
  
    
    //se saca las tracks y el name de la playlist para creaarla
   const {tracks, name} = req.body
   const {id} = req.user

   if(tracks.length === 0) return  res.json({error:'debe haber almenos una cancion para crear una playlist'})

  

     //se crea la playlist antes de todo y se la relaciona con el userId al usaro que tiene hecho login
    const playlist = await Playlist.create({name,userId:id,shared:false});

 
 //de las tracks que se pasan por body se mapean para crear cada track en su modelo y despues se recolectan los ids de esas
 // tracks que se crean para relacionarlas a la playlist
   const TracksOfPlaylist = await Promise.all(
    tracks.map(async (track) => {
      const result = await createTrack(track);
      return result.dataValues;
    })
  );

  console.log(TracksOfPlaylist);
  //se sacan los ids de cada track creada
  const idsOfTracks = TracksOfPlaylist.map((track)=>{
  return track.id
  })

  console.log(idsOfTracks);


  //se relaciona cada track a la playlist creada
  await playlist.setTracks(idsOfTracks)

//se retorna la playlist creada pero sin las tracks, pero las tracks ya estan relacionadas
  res.json(playlist)

})

const removePlaylist = catchError(async(req,res)=>{
    
  const {id:userId} = req.user
  
           const {id} = req.params


    //se eliminar la playlist con cierto id y con ello se eliminaran todas las relaciones tambien       
    const result = await Playlist.destroy({where:{id,userId} });
 
   res.json(result)
 
 })

const getPlaylistWithTracks = catchError(async(req,res)=>{
    const {id} = req.params
    const {id:userId} = req.user


    const playlist = await Playlist.findOne({where:{id,userId},include:[Track]});
    if(!playlist) return res.sendStatus(404);
    



    const config = await getConfig();

    const idsOfTracks = playlist.tracks.map((track)=>{
        return track.spotifyId
        }).join(',')

    const { data } = await axios.get(
            `https://api.spotify.com/v1/tracks?ids=${idsOfTracks}`,
            config
          );

     playlist.dataValues.tracks = data.tracks

    res.json(playlist.dataValues)
}) 

const playlistToShared = catchError(async(req,res)=>{
  const {id:idUserLogeado} = req.user
  const { id } = req.params;
  const result = await Playlist.update(
      {shared:true},
      {where:{id,userId:idUserLogeado}, returning: true }
  );
  if(result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
}) 


const getPlaylistShared = catchError(async(req,res)=>{
  const {id} = req.params

  const playlist = await Playlist.findOne({where:{id},include:[Track]});
  if(!playlist) return res.sendStatus(404);

   if(playlist.dataValues.shared === false) return res.json({error:'esta playlist no esta compartida'})

   const config = await getConfig();

   const idsOfTracks = playlist.tracks.map((track)=>{
       return track.spotifyId
       }).join(',')

   const { data } = await axios.get(
           `https://api.spotify.com/v1/tracks?ids=${idsOfTracks}`,
           config
         );

    playlist.dataValues.tracks = data.tracks

   res.json(playlist.dataValues)



}) 

module.exports = {
    getAll,
    createPlaylist,
    removePlaylist,
    getPlaylistWithTracks,
    getPlaylistShared,
    playlistToShared
}