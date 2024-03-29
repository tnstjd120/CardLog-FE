import { css } from "@emotion/react";

export const homeStyles = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  background-color: inherit;
  color: inherit;

  & > pre {
    width: 100%;
    max-width: 50%;
    line-height: 1.5;
    font-size: 1em;
    padding: 30px;
  }
`;
