import { css } from "@emotion/react";
import { palette } from "styles/theme";

export const sideBarStyle = css`
  position: relative;
  flex-basis: 200px;
  flex-shrink: 0;
  height: 100%;
  font-size: 16px;
  font-weight: 300;
  padding: 20px 0;
  transition: 0.4s;
  background-color: inherit;
  color: inherit;

  &::after {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23999999FF' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='6' stroke-linecap='butt'/%3e%3c/svg%3e");
  }

  a {
    color: ${palette.black3};
    transition: 0.3s;

    &:hover {
      color: ${palette.black1};
    }

    &.active {
      color: ${palette.black1};
    }
  }

  h2 {
    font-size: 1.2em;
    font-weight: 500;
    text-align: center;

    a {
      color: inherit;
    }
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
      background-color: ${palette.gray0};
      svg {
        font-size: 8em;
        color: ${palette.white};
      }
    }

    figcaption {
      font-size: 1em;
      font-weight: 400;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    font-size: 0.9em;
    padding-bottom: 30px;
    overflow: auto;

    a {
      border-bottom: 1px solid #ddd;
      display: block;
      height: 100%;
      padding: 10px 20px;
      color: inherit;

      &:hover {
        background-color: ${palette.gray2};
      }
    }
  }

  .links {
    position: absolute;
    left: 20px;
    bottom: 0;
    font-size: 2.3em;
    a {
      color: inherit;
    }
  }
`;
