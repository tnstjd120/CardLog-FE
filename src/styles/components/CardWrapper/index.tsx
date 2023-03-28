import { css } from "@emotion/react";
import { palette } from "styles/theme";

export const cardWrapperStyles = css`
  position: relative;
  margin-top: 100px;
  margin-left: 30px;
  & > ul {
    padding: 30px 0;
    padding-right: 80px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    min-height: 460px;

    li {
      box-shadow: 2px 10px 18px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 50px;
      min-width: 250px;
      height: 400px;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        transform: translateY(-5%);
        box-shadow: 2px 10px 18px 4px rgba(0, 0, 0, 0.2);
      }

      h3 {
        font-size: 1em;
        font-weight: 500;
      }
    }
  }

  & > .controller {
    display: flex;
    position: absolute;
    right: 20px;
    bottom: -60px;
  }
`;
