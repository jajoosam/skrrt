const spotify = require("../../utils/spotify.js");

export default async (req, res) => {
  if (!spotify.getAccessToken()) {
    const data = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(data.body["access_token"]);
  }
  let recommendations = await spotify.getRecommendations({
    ...req.body,
    limit: 1,
  });

  let useful = recommendations.body.tracks.map((track) => {
    return {
      image: track.album.images[0].url,
      release: track.album.release_day,
      artists: track.artists.map((artist) => artist.name),
      preview: track.preview_url,
      name: track.name.replace(/ *\([^)]*\) */g, ""),
      id: track.id,
    };
  });

  res.json(useful);
};
