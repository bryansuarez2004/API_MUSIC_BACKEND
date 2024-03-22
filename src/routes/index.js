const express = require('express');
const trackRouter = require('./track.router');
const playlistRouter = require('./playlist.router');
const userRouter = require('./user.router');
const artistRouter = require('./artist.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/tracks',trackRouter)
router.use('/playlists',playlistRouter)
router.use('/users',userRouter)
router.use('/artists',artistRouter)

module.exports = router;