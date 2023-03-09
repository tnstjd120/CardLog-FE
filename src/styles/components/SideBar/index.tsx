import { css } from "@emotion/react";

export const sideBarStyle = css`
  flex-basis: 300px;
  flex-shrink: 0;
  height: 100%;
  background-color: #fff;
  font-size: 18px;
  border-right: 1px solid #ddd;

  nav {
    display: flex;
    flex-direction: column;

    a {
      border-bottom: 1px solid #ddd;

      display: block;
      height: 100%;
      padding: 10px 20px;
      transition: 0.3s;

      &:hover {
        color: royalblue;
      }

      &.active {
        color: royalblue;
      }
    }
  }
`;
