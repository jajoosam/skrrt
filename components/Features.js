import { css } from "emotion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import axios from "axios";

const Feature = styled.span`
  display: inline-block;
  font-size: 0.9em;
  vertical-align: middle;
  margin-bottom: 8px;
  margin-right: 15px;
`;
const Features = ({ id }) => {
  let [features, setFeatures] = useState({});
  useEffect(() => {
    const f = async () => {
      let body = await axios.post(`/api/features`, { id });
      setFeatures(body.data);
    };
    f();
  }, [id]);
  return (
    <div
      className={css`
        margin: auto;

        margin-top: 1em;
        font-family: sans-serif;
        font-size: 1.2em;
        padding-top: 8px;
      `}
    >
      👀 <Feature>{features.popularity}</Feature>
      💃 <Feature>{features.danceability}</Feature>
      🥁 <Feature>{features.tempo}</Feature>
      🔥 <Feature>{features.energy}</Feature>
      {features.valence > 50 ? "🙂" : "🙃"}{" "}
      <Feature>{features.valence}</Feature>
      🎤 <Feature>{features.speechiness}</Feature>
      🔑{" "}
      <Feature>{`${
        ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
          features.key
        ]
      } ${features.mode ? "Major" : "Minor"}`}</Feature>
    </div>
  );
};

export default Features;
