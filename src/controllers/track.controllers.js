const catchError = require('../utils/catchError');
const Track = require('../models/Track');


const createTrack = async(spotifyId) => {
    const [newTrack] = await Track.findOrCreate({
        where: { spotifyId },
        defaults: {
          spotifyId,
          
        },
      });
      console.log(newTrack.dataValues);
      return newTrack
};

module.exports = {
    createTrack
}