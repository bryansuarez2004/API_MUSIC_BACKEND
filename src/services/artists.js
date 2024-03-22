const { default: axios } = require("axios");
const { getConfig } = require("../utils/configSpotyApi");



// servicio que trae info del artista por id del arttista mandado por parametro en el endpoint
const getArtistByIdSpotify = async (req, res) => {
    try {
      
        const artistId = req.params.idArtistSpoty;
        const config = await getConfig();
 
        const { data: dataArtist } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}`,
            config
          );
        
          const { data: songsTop } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
            config
          );
        
          const { data: albums } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums`,
            config
          );

          dataArtist.songsTop = songsTop.tracks;
          dataArtist.albums = albums.items;
           
    
        return res.status(200).json(dataArtist);

  
    } catch (err) {
      return res.json(err)
    }
  };
  
  module.exports = { getArtistByIdSpotify};