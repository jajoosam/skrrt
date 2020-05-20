import { css } from "emotion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";

const Feature = styled.span`
  display: inline-block;
  font-size: 0.9em;
  vertical-align: middle;
  margin-bottom: 8px;
  margin-right: 15px;
`;

const FeatureLabel = ({ label, emoji }) => (
  <span
    data-place="bottom"
    data-effect="solid"
    data-arrow-color="#fff"
    data-tip={label}
  >
    {emoji}
  </span>
);

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
      <ReactTooltip />
      <FeatureLabel label="Popularity" emoji="👀" />{" "}
      <Feature>{features.popularity}</Feature>
      <FeatureLabel label="Danceability" emoji="💃" />{" "}
      <Feature>{features.danceability}</Feature>
      <FeatureLabel label="Tempo" emoji="🥁" />{" "}
      <Feature>{features.tempo}</Feature>
      <FeatureLabel label="Energy" emoji="🔥" />{" "}
      <Feature>{features.energy}</Feature>
      <FeatureLabel
        label="Valence"
        emoji={features.valence > 50 ? "🙂" : "🙃"}
      />
      <Feature>{features.valence}</Feature>
      <FeatureLabel label="Speechiness" emoji="🎤" />{" "}
      <Feature>{features.speechiness}</Feature>
      <FeatureLabel label="Key" emoji="🔑" />{" "}
      <Feature>{`${
        ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][
          features.key
        ]
      } ${features.mode ? "Major" : "Minor"}`}</Feature>
    </div>
  );
};

export default Features;
