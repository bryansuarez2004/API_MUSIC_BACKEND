const express = require('express');
const { getArtistByIdSpotify, getTopArtist } = require('../services/artists');

const artistRouter = express.Router();


artistRouter.route('/topArtist')
    .get(getTopArtist)

artistRouter.route('/:idArtistSpoty')
    .get(getArtistByIdSpotify)

module.exports = artistRouter;