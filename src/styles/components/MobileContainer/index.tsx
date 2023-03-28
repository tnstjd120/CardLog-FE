import { css } from "@emotion/react";
import { palette } from "styles/theme";

export const mobileContainerStyles = css`
  position: fixed;
  background-color: ${palette.white};
  z-index: 10;
  width: 100vw;
  height: 100vh;
  left: 50%;
  transform: translateX(-50%);
  top: -5vh;

  .inner {
    background-color: ${palette.gray2};
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    padding-top: 50px;

    .top_nav {
      height: 50px;
      background-color: ${palette.black1};
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;

      button {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }

      h4 {
        color: ${palette.white};
        font-weight: 400;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      padding: 0 20px 50px;
      overflow-y: auto;

      figure {
        padding: 50px 0 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        img {
          max-width: 100px;
        }

        figcaption {
          padding-top: 40px;
          text-align: center;
          font-size: 1.2rem;
          color: ${palette.black2};
          font-weight: 400;

          small {
            font-size: 1rem;
            font-weight: 300;
            color: ${palette.black4};
          }
        }
      }
    }
  }
`;
