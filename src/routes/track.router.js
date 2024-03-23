const express = require('express');
const { getMainTracks, searchTracks, getTrackByIdSpotify } = require('../services/tracks');
const { getOne } = require('../controllers/track.controllers');

const trackRouter = express.Router();

trackRouter.route('/')
    .get(getMainTracks)

trackRouter.route('/search')
    .post(searchTracks)    

trackRouter.route('/:idSpotify')  
    .get(getOne) 
    


    

module.exports = trackRouter;