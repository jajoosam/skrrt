import axios from "axios";
import { useState, useEffect } from "react";

import YouTube from "react-youtube";
import { css } from "emotion";

import Editor from "../../components/Editor";
import Features from "../../components/Features";
import Lyrics from "../../components/Lyrics";
import Info from "../../components/Info";
import Button from "../../components/Button";
import Meta from "../../components/Meta";
import Window from "../../components/Window";

import Head from "next/head";
import { useRouter } from "next/router";

const Page = ({ text, json, translated, id }) => {
  let [player, setPlayer] = useState(null);
  let [track, setTrack] = useState({ id: null });
  const router = useRouter();

  useEffect(() => {
    if (player) {
      console.log(track);
      player.cuePlaylist({
        listType: "search",
        list: `${track.name} ${track.artists[0]} ${
          json.append ? json.append : ""
        }`,
        suggestedQuality: "medium",
      });
    }
  }, [track]);

  const newTrack = async () => {
    let recommendations = await axios.post(`/api/recommend`, translated);
    setTrack(recommendations.data[0]);
  };

  const edit = () => {
    localStorage.code = text;
    router.push(`/sandbox`);
  };

  return (
    <div
      className={css`
        margin: 2em;
        @media (max-width: 1000px) {
          margin: 5px;
        }
      `}
    >
      <Head>
        <title key="title">Skrrt: {json.name ? json.name : "Unnamed"}</title>
        <Meta id={id} name={json.name || "Unnamed Radio"} type="radio" />
      </Head>
      <h2
        className={css`
          font-family: sans-serif;
        `}
      >
        {json.name}
      </h2>

      <div
        className={css`
          display: flex;
          justify-content: space-around;
          @media (max-width: 1000px) {
            display: block;
          }
        `}
      >
        <div
          className={css`
            flex-grow: 1;
          `}
        >
          <Window>
            <Editor value={text} onValueChange={() => {}} />
          </Window>
          <Button onClick={newTrack}>run</Button>
          <Button onClick={edit}>edit</Button>
          {track.id && json.lyrics && (
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
              filter: ${json.morph};
              max-width: 600px;
              width: 100%;
              border-radius: 10px;
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
  );
};

export default Page;

export async function getServerSideProps(context) {
  const { get } = require("../../utils/store");
  let body = await get(context.params.id);
  let { text, json, translated } = body.data;
  return {
    props: { text, json, translated, id: context.params.id },
  };
}
