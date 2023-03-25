import { css } from "@emotion/react";
import { palette } from "styles/theme";

export const sideBarStyle = css`
  flex-basis: 200px;
  flex-shrink: 0;
  height: 100%;
  background-color: ${palette.white};
  font-size: 16px;
  border-right: 1px dashed ${palette.black3};
  padding: 20px 0;

  h2 {
    font-size: 1.2em;
    font-weight: 500;
    text-align: center;
  }

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid ${palette.gray1};

    .img_wrap {
      width: 150px;
      height: 150px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }

    figcaption {
      font-size: 1em;
      font-weight: 400;
    }
  }

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
