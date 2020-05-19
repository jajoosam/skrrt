const spotify = require("../../help/spotify.js");
const axios = require("axios");
const getClosest = require("didyoumean2").default;

const genres = require("../../help/genres.json");

export default async (req, res) => {
  // get access token if not already available. will be a cron job
  if (!spotify.getAccessToken()) {
    const data = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(data.body["access_token"]);
  }
  // mock filter
  let filter = req.body;

  // for logs
  console.log(filter);

  let final = {};

  // seed processing

  // track name -> ID
  if (filter.seed.tracks && filter.seed.tracks.length > 0) {
    filter.seed.tracks = await filter.seed.tracks.map(async (query) => {
      const results = await spotify.search(query, ["track"]);
      return await results.body.tracks.items[0].id;
    });
  }

  // artist name -> ID
  if (filter.seed.artists && filter.seed.artists.length > 0) {
    filter.seed.artists = await filter.seed.artists.map(async (query) => {
      const results = await spotify.search(query, ["artist"]);
      return await results.body.artists.items[0].id;
    });
  }

  if (filter.seed.genres && filter.seed.genres.length > 0) {
    filter.seed.genres = await filter.seed.genres.map((query) =>
      getClosest(query, genres)
    );
  }

  // get the keys of all objects in `seed`
  let sets = Object.keys(filter.seed).filter(
    (key) => filter.seed[key].length > 0
  );

  let values = await Promise.all(
    sets.map((set) => Promise.all(filter.seed[set]))
  );

  sets.forEach((set, index) => {
    final[`seed_${set}`] = values[index];
  });

  // tunable processing
  Object.keys(filter)
    .filter((key) =>
      [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence",
      ].includes(key)
    )
    .forEach((key) => {
      if (filter[key].min) final[`min_${key}`] = filter[key].min / 100;
      if (filter[key].max) final[`max_${key}`] = filter[key].max / 100;
    });

  Object.keys(filter)
    .filter((key) => ["tempo", "loudness", "popularity"].includes(key))
    .forEach((key) => {
      if (filter[key].min) final[`min_${key}`] = filter[key].min;
      if (filter[key].max) final[`max_${key}`] = filter[key].max;
    });

  // key
  if (filter.key) {
    let keys = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    filter.key = filter.key.split(" ");
    if (keys.includes(filter.key[0].toUpperCase()))
      final.target_key = keys.indexOf(filter.key[0].toUpperCase());
    else
      final.target_mode =
        filter.key[0].toLowerCase().trim() === "major" ? 1 : 0;

    if (filter.key[1])
      final.target_mode =
        filter.key[1].toLowerCase().trim() === "major" ? 1 : 0;
  }

  res.statusCode = 200;
  res.json(final);
};
