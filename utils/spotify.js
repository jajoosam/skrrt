require("dotenv").config();
const API = require("spotify-web-api-node");

const spotify = new API({
  clientId: process.env.SPOTIFY_CLIENT,
  clientSecret: process.env.SPOTIFY_SECRET,
});

module.exports = spotify;
