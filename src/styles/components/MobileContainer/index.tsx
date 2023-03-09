import { css } from "@emotion/react";

export const mobileContainerStyles = css`
  width: 100%;
  height: 100vh;

  .inner {
    background-color: #f5f5f5;
    height: 100vh;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    padding-top: 50px;

    .top_nav {
      height: 50px;
      background-color: #333;
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
        color: #fff;
        font-weight: 400;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;
