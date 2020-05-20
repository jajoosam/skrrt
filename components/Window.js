import { css } from "emotion";
import styled from "@emotion/styled";

const ActionCircle = styled.div`
  background: ${(props) => props.color};
  border-radius: 100%;
  width: 13px;
  height: 13px;
  display: inline-block;
  margin-right: 10px;
  user-select: none;
`;

const Window = ({ children }) => (
  <div
    className={css`
      background: #302658;
      max-width: 600px;
      border-radius: 10px;
      padding-bottom: 1em;
      box-shadow: rgba(59, 43, 91, 0.7) 0px 10px 50px;
    `}
  >
    <div
      className={css`
        padding: 1em;
        padding-bottom: 0;
      `}
    >
      <ActionCircle color="#FF4C43" />
      <ActionCircle color="#FFBF00" />
      <ActionCircle color="#00D329" />
    </div>
    {children}
  </div>
);
export default Window;
