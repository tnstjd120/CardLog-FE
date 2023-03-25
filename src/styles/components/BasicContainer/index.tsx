import { css } from "@emotion/react";
import { palette } from "styles/theme";

export const basicContainerStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 40px);
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
`;
