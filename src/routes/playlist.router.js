const express = require('express');
const { getAll, createPlaylist, removePlaylist, getPlaylistWithTracks } = require('../controllers/playlists.controllers');

const playlistRouter = express.Router();

playlistRouter.route('/')
   .get(getAll)

playlistRouter.route('/create')
    .post(createPlaylist)

playlistRouter.route('/:id/remove')
    .post(removePlaylist)    

playlistRouter.route('/:id/tracks')    
    .get(getPlaylistWithTracks)

module.exports = playlistRouter;