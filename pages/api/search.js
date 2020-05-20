const spotify = require("../../utils/spotify.js");

export default async (req, res) => {
  if (!spotify.getAccessToken()) {
    const data = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(data.body["access_token"]);
  }
  let data = await spotify.searchTracks(req.body.query);
  const track = data.body.tracks.items[0];
  res.json({
    image: track.album.images[0].url,
    release: track.album.release_day,
    artists: track.artists.map((artist) => artist.name),
    preview: track.preview_url,
    name: track.name.replace(/ *\([^)]*\) */g, ""),
    id: track.id,
  });
};
