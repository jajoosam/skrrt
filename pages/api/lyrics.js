require("dotenv").config();

import { getLyrics } from "genius-lyrics-api";
import { lyricCache } from "../../utils/store";
export default async (req, res) => {
  let lyrics = await lyricCache.get(req.body.track.id);
  if (!lyrics) {
    lyrics = await getLyrics({
      apiKey: process.env.GENIUS,
      title: req.body.track.name,
      artist: req.body.track.artists[0],
      optimizeQuery: true,
    });
    lyricCache.put(lyrics, req.body.track.id);
  } else {
    lyrics = lyrics.value;
  }

  res.json({
    lyrics,
  });
};
