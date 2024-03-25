const express = require('express');
const { getAll, createPlaylist, removePlaylist, getPlaylistWithTracks, getPlaylistShared, playlistToShared } = require('../controllers/playlists.controllers');
const { verifyJWT } = require('../utils/verifyJWT');

const playlistRouter = express.Router();

playlistRouter.route('/')
   .get(verifyJWT, getAll)

playlistRouter.route('/create')
    .post(verifyJWT, createPlaylist)

playlistRouter.route('/:id/changeToShared')   
    .put(verifyJWT, playlistToShared) 

playlistRouter.route('/:id/remove')
    .delete(verifyJWT, removePlaylist)    

playlistRouter.route('/:id/tracks')    
    .get(verifyJWT, getPlaylistWithTracks)

playlistRouter.route('/:id/shared')   
    .get(getPlaylistShared) 

   

module.exports = playlistRouter;