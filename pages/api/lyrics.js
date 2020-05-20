require("dotenv").config();

import { getLyrics } from "genius-lyrics-api";

export default async (req, res) => {
  const lyrics = await getLyrics({
    apiKey: process.env.GENIUS,
    title: req.body.track.name,
    artist: req.body.track.artists[0],
    optimizeQuery: true,
  });

  res.json({
    lyrics,
  });
};
