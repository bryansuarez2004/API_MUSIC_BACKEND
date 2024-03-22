const express = require('express');
const { getArtistByIdSpotify } = require('../services/artists');

const artistRouter = express.Router();

artistRouter.route('/:idArtistSpoty')
    .get(getArtistByIdSpotify)

module.exports = artistRouter;