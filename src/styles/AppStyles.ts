import { css } from "@emotion/react";

export const wrapStyles = css`
  width: 100%;
  height: 95vh;
`;

export const mainStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
`;

export const contentStyles = css`
  height: 100%;
  width: calc(100% - 200px);
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.4s;
`;
