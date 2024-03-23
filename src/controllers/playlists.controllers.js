const catchError = require('../utils/catchError');
const Playlist = require('../models/Playlist');

const getAll = catchError(async(req, res) => {
    return res.json(/* valor a retornar */)
});

module.exports = {
    getAll
}