/** @jsxImportSource @emotion/react */

import { Global } from "@emotion/react";
import { css } from "@emotion/react";
import React, { ComponentProps } from "react";

export const GlobalStyles: React.FC<ComponentProps<any>> = () => (
  <Global
    styles={css`
      /* Reset styles */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html,
      body,
      #root {
        height: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR", sans-serif;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      a {
        color: #333;
        text-decoration: none;
      }
      img {
        width: 100%;
        max-width: 100%;
        vertical-align: top;
      }
      .swal2-styled.swal2-default-outline:focus {
        box-shadow: none;
      }
      .scrollBar::-webkit-scrollbar {
        width: 2px; /* 스크롤바의 너비 */
      }

      .scrollBar::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #555; /* 스크롤바의 색상 */

        border-radius: 6px;
      }

      .scrollBar::-webkit-scrollbar-track {
        background: rgba(240, 240, 240, 0.1); /*스크롤바 뒷 배경 색상*/
      }

      .scroll::-webkit-scrollbar {
        display: none;
      }
    `}
  />
);
