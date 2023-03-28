import { css } from "@emotion/react";
import { palette } from "styles/theme";

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

  & > pre {
    width: 100%;
    max-width: 50%;
    height: 200px;
    line-height: 1.5;
    font-size: 1em;
    padding: 30px 0 30px 80px;
  }
`;
