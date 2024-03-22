const express = require('express');
const { getTrackByIdSpotify } = require('../services/tracks');

const playlistRouter = express.Router();

playlistRouter.route('/')
    .get(getTrackByIdSpotify)

module.exports = playlistRouter;