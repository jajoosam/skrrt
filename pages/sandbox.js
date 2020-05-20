import axios from "axios";
import { useState, useEffect } from "react";

import JSON5 from "json5";
import YouTube from "react-youtube";
import { HotKeys } from "react-hotkeys";
import { css } from "emotion";

import Editor from "../components/Editor";
import Features from "../components/Features";
import Lyrics from "../components/Lyrics";
import Info from "../components/Info";
import Button from "../components/Button";
import Meta from "../components/Meta";
import Window from "../components/Window";

import Head from "next/head";
import { useRouter } from "next/router";

const isJSON5 = (string) => {
  try {
    JSON5.parse(string);
    return true;
  } catch {
    return false;
  }
};

const Page = () => {
  let [translated, setTranslated] = useState({ code: null, filter: null });
  let [player, setPlayer] = useState(null);
  let [track, setTrack] = useState({ id: null });
  const router = useRouter();

  const newTrack = async () => {
    if (!isJSON5(code)) return alert(`invalid json5`);

    // only translate on change
    if (translated.code !== code) {
      let filter = await axios.post(`/api/translate`, JSON5.parse(code));
      let fork = translated;
      fork.code = code;
      fork.filter = filter.data;
      setTranslated(fork);
    }

    let recommendations = await axios.post(`/api/recommend`, translated.filter);
    setTrack(recommendations.data[0]);
  };

  const save = async () => {
    if (!translated.filter) {
      return alert("You need to run at least once before you save.");
    }
    const body = await axios.post("/api/save", {
      text: code,
      json: filter,
      translated: translated.filter,
    });

    router.push("/radio/[id]", `/radio/${body.data.id}`);
  };

  const [code, setCode] = useState(
    `{
    name: "Chill Hip Hop",
    seed: {
      tracks: ["Walk it like I talk it"],
      artists: ["Migos", "Rae Sremmurd", "Juice WRLD"]
    },
    danceability: { 
      min: 10
    },
    popularity: {
      max: 80,
      min: 30
    },
    speechiness: { 
      max: 40
    },
    energy: {
      min: 50
    }
}

// customise this as you want - 🌐 docs.skrrt.fun`
  );
  const [hydrated, setHydrated] = useState(false);
  // runs only once
  useEffect(() => {
    if (localStorage.code) setCode(localStorage.code);
    setHydrated(true);
  }, []);
  // save val to localstorage each time
  useEffect(() => {
    if (hydrated) localStorage.code = code;
    if (isJSON5(code)) setFilter(JSON5.parse(code));
  }, [code]);
  useEffect(() => {
    if (player) {
      console.log(track);
      player.cuePlaylist({
        listType: "search",
        list: `${track.name} ${track.artists[0]}`,
        suggestedQuality: "medium",
      });
    }
  }, [track]);

  let [filter, setFilter] = useState({});

  const keyMap = {
    search: "s",
  };

  const handlers = {
    search: async () => {
      const query = prompt(`What track do you want to play?`);
      const body = await axios.post("/api/search", { query });
      setTrack(body.data);
    },
  };

  return (
    <div>
      <HotKeys
        keyMap={keyMap}
        handlers={handlers}
        className={css`
          &:focus {
            outline: none;
          }
        `}
      >
        <div
          className={css`
            margin: 2em;
            @media (max-width: 1300px) {
              margin: 5px;
            }
          `}
        >
          <Head>
            <title key="title">
              Skrrt: {filter.name ? filter.name : "Sandbox"}
            </title>
            <Meta id="sandbox" name={"Sandbox"} type="sandbox" />
          </Head>
          <h2
            className={css`
              font-family: sans-serif;
            `}
          >
            {filter.name}
          </h2>

          <div
            className={css`
              display: flex;
              @media (max-width: 1000px) {
                display: block;
              }
              justify-content: space-around;
            `}
          >
            <div
              className={css`
                flex-grow: 1;
              `}
            >
              <Window>
                <Editor value={code} onValueChange={(code) => setCode(code)} />
              </Window>
              <Button onClick={newTrack}>run</Button>
              <Button onClick={save}>save</Button>
              {track.id && filter.lyrics && (
                <div>
                  <Lyrics track={track} />
                </div>
              )}
            </div>
            <div
              className={css`
                flex: 2;
              `}
            >
              <YouTube
                onReady={(target) => {
                  setPlayer(target.target);
                }}
                onStateChange={(o) => {
                  if (o.data === 5) {
                    player.playVideo();
                  }
                }}
                onEnd={newTrack}
                className={css`
                  filter: ${filter.morph};
                  max-width: 600px;
                  width: 100%;
                  @media (max-width: 1000px) {
                    margin-top: 2em;
                    width: 100%;
                  }
                `}
              />
              {track.id && (
                <div>
                  <Info track={track}></Info>
                  <Features id={track.id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </HotKeys>
    </div>
  );
};

export default Page;
