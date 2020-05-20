const spotify = require("../../utils/spotify.js");

export default async (req, res) => {
  const data = await spotify.clientCredentialsGrant();
  spotify.setAccessToken(data.body["access_token"]);
  res.statusCode = 200;
  res.end();
};
