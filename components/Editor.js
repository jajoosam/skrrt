import { css } from "emotion";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import Editor from "react-simple-code-editor";

const EditorBla = ({ value, onValueChange }) => (
  <Editor
    {...{ value, onValueChange }}
    highlight={(code) => highlight(code, languages.json5)}
    padding={10}
    className={css`
      font-family: "Fira Code", "Fira Mono", monospace;
      font-size: 12;
      max-width: 600px;
      border: 5px solid #111;
    `}
    textareaClassName={css`
      &:focus {
        outline: none;
      }
    `}
    preClassName={editorStyles}
  />
);

const editorStyles = css`
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
  }
  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #898ea4;
  }
  .token.punctuation {
    color: #5e6687;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.boolean,
  .token.number,
  .token.operator {
    color: #c76b29;
  }
  .token.property {
    color: #c08b30;
  }
  .token.tag {
    color: #3d8fd1;
  }
  .token.string {
    color: #22a2c9;
  }
  .token.selector {
    color: #6679cc;
  }
  .token.attr-name {
    color: #c76b29;
  }
  .language-css .token.string,
  .style .token.string,
  .token.entity,
  .token.url {
    color: #22a2c9;
  }
  .token.attr-value,
  .token.control,
  .token.directive,
  .token.keyword,
  .token.unit {
    color: #ac9739;
  }
  .token.atrule,
  .token.regex,
  .token.statement {
    color: #22a2c9;
  }
  .token.placeholder,
  .token.variable {
    color: #3d8fd1;
  }
  .token.deleted {
    text-decoration: line-through;
  }
  .token.inserted {
    border-bottom: 1px dotted #202746;
    text-decoration: none;
  }
  .token.italic {
    font-style: italic;
  }
  .token.bold,
  .token.important {
    font-weight: 700;
  }
  .token.important {
    color: #c94922;
  }
  .token.entity {
    cursor: help;
  }
  pre > code.highlight {
    outline: 0.4em solid #c94922;
    outline-offset: 0.4em;
  }
`;

export default EditorBla;
