const catchError = require('../utils/catchError');
const Track = require('../models/Track');
const { getTrackByIdSpotify } = require('../services/tracks');


const createTrack = async(spotifyId) => {
    const [newTrack] = await Track.findOrCreate({
        where: { spotifyId },
        defaults: {
          spotifyId,
          
        },
      });

      
      return newTrack
};



const getOne = catchError(async(req, res) => {

    const { idSpotify } = req.params;
    
    const data = await getTrackByIdSpotify(idSpotify)

    return res.json(data)
});



module.exports = {
    createTrack,
    getOne
}