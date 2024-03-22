const { default: axios } = require("axios");
require('dotenv').config();


const getConfig = async () => {
    const clientId =process.env.CLIENT_ID; // Tu ID de cliente de Spotify
    const clientSecret =process.env.CLIENT_SECRET; // Tu secreto de cliente de Spotify
  
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const accessToken = response.data.access_token; // crear configuracion para api spotify
       
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      return config
    } catch (error) {
      console.error('Hubo un error al obtener el token de acceso:', error);
      throw error;
    }
  };

  module.exports = { getConfig };