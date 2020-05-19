import { css } from "emotion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import axios from "axios";

const Info = ({ track }) => {
  return (
    <div
      className={css`
        margin: auto;
        margin-top: 1em;
        font-family: sans-serif;
        font-size: 1.5em;
        padding-top: 8px;
      `}
    >
      <strong>{track.name}</strong>
      &nbsp;
      <span
        className={css`
          font-size: 10px;
          text-decoration: underline;
        `}
      >
        {track.artists.join(", ")}
      </span>
    </div>
  );
};

export default Info;
