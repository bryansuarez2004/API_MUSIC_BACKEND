const { default: axios } = require("axios");
const { getConfig } = require("../utils/configSpotyApi");


const getMainTracks = async (req, res) => {
  try {
    const config = await getConfig();

    const { data } = await axios.get(
      "https://api.spotify.com/v1/search?q=imaginedragons&type=track&limit=10",
      config
    );

    return res.json(data);
  } catch (err) {
    return res.json(err)

  }
};

const searchTracks = async (req, res) => {
  try {
    const { name, limit } = req.body;
    if (name && limit) {
      const config = await getConfig();

      const { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${name}&type=track&limit=${limit}`,
        config
      );

      return res.json(data);
    }
    return res.json({ error: "invalid credentials" });
  } catch (err) {
    return res.json(err)

  }
};

const getTrackByIdSpotify = async (req, res) => {
  try {
    const { idSpotify } = req.params;

    const config = await getConfig();

    const { data } = await axios.get(
      `https://api.spotify.com/v1/tracks/${idSpotify}`,
      config
    );

    return res.json(data);


  } catch (err) {
    return res.json(err)
  }
};

module.exports = { getMainTracks, searchTracks, getTrackByIdSpotify };
