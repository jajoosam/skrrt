const spotify = require("../../help/spotify.js");

export default async (req, res) => {
  if (!spotify.getAccessToken()) {
    const data = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(data.body["access_token"]);
  }
  let features = await spotify.getAudioFeaturesForTrack(req.body.id);
  let track = await spotify.getTrack(req.body.id);
  let toSend = { popularity: track.body.popularity };

  Object.keys(features.body)
    .filter((key) => typeof features.body[key] === "number")
    .forEach((key) => {
      toSend[key] = [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence",
      ].includes(key)
        ? Math.round(features.body[key] * 100)
        : Math.round(features.body[key]);
    });

  res.json(toSend);
};
