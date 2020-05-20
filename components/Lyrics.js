import { css } from "emotion";
import { useState, useEffect } from "react";
import axios from "axios";

const Lyrics = ({ track }) => {
  let [lyrics, setLyrics] = useState("Loading...");
  useEffect(() => {
    setLyrics("Loading...");
    const f = async () => {
      let body = await axios.post(`/api/lyrics`, { track });
      setLyrics(body.data.lyrics);
    };
    f();
  }, [track]);
  return (
    <div
      className={css`
        margin-top: 1em;
        font-family: sans-serif;
        padding-top: 8px;
        max-height: 180px;
        overflow: scroll;
        max-width: 600px;
      `}
    >
      <h3>Lyrics</h3>
      {lyrics
        ? lyrics.split("\n").map((bar, i) => <p key={i}>{bar}</p>)
        : "Not found"}
    </div>
  );
};

export default Lyrics;
