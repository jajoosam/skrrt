import Meta from "../components/Meta";
import Button from "../components/Button";

import Link from "next/link";
import Head from "next/head";
import { css } from "emotion";
import styled from "@emotion/styled";
const Mark = styled.mark`
  display: inline-block;
  padding: 0.25em;
  border-radius: 3px;
  background: ${(props) => props.color}66;
`;

const Home = () => (
  <div
    className={css`
      font-family: sans-serif;
    `}
  >
    <Head>
      <title key="title">Skrrt</title>
      <Meta id="skrrt" name={"Skrrt"} type="" />
    </Head>
    <h1
      className={css`
        text-align: center;
        margin-top: 1em;
      `}
    >
      🤟 skrrt
    </h1>
    <br />
    <img
      src="/skrrt.png"
      className={css`
        display: block;
        margin: 1em auto;
        width: 90%;
        border-radius: 16px;
        max-width: 450px;
        box-shadow: 0 10px 50px rgba(59, 43, 91, 0.7);
      `}
    />
    <div
      className={css`
        text-align: center;
        color: #4d4d4d;
        margin-bottom: 1em;
      `}
    >
      a <Mark color="#0099FF">repl</Mark> for your{" "}
      <Mark color="#57C791">music</Mark>
    </div>
    <div
      className={css`
        text-align: center;
      `}
    >
      <Link href="/sandbox">
        <a>
          <Button>sandbox</Button>
        </a>
      </Link>
    </div>
  </div>
);

export default Home;
