# skrrt
### a repl for music
![logo](public/meta.png)
I spend several hours every week curating my music - I can't rely on Spotify recommendations to give me what I want. I want to be able to tell something the music I like instead of it predicting what I might like, very ambiguously.

skrrt gives me the music I ask for - it takes in a filter for music in JSON like this, passes it on to the spotify API, and gets recommendations.
```json
{
    "name": "Study Music",
    "seed": {
		"tracks": ["A lot", "Middle Child"],
	    "artists": ["21 Savage", "J Cole"],
		},
    "key": "minor",
    "danceability": {
        "min": 10
    },
    "popularity": {
        "max": 80,
        "min": 30
    },
    "speechiness": {
        "max": 40
    },
    "energy": {
        "min": 50
    }
}
```

If this sounds interesting, head on over to [docs.skrrt.fun](https://docs.skrrt.fun).