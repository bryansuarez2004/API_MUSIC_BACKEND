const express = require('express');
const { getMainTracks, searchTracks, getTrackByIdSpotify } = require('../services/tracks');

const trackRouter = express.Router();

trackRouter.route('/')
    .get(getMainTracks)

trackRouter.route('/search')
    .post(searchTracks)    

trackRouter.route('/:idSpotify')  
    .get(getTrackByIdSpotify) 
    


    

module.exports = trackRouter;