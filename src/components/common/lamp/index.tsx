/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setThemeType, ThemeStateProps } from "store/themeType";

const switchKeyframes = keyframes`
  0% {
    height: 30px;
  }
  50% {
    height: 45px;
  }
  100% {
    height: 40px;
  }
`;

const lampStyles = css`
  position: absolute;
  top: 0;
  right: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  input[name="lampSwitch"] {
    display: none;

    &:checked ~ .lamp::before {
      background: rgba(255, 255, 255, 1);
      box-shadow: inset 2px -2px 20px 4px rgba(255, 237, 172, 0.6),
        0px 2px 40px 15px rgba(255, 237, 172, 0.6),
        0px 5px 80px 30px rgba(255, 237, 172, 0.6),
        0px 50px 100px 45px rgba(255, 237, 172, 0.4),
        0px 100px 200px 60px rgba(255, 237, 172, 0.4);
    }

    &:checked ~ label {
      animation: ${switchKeyframes} 0.4s ease-in-out forwards;

      &::after {
        opacity: 1;
      }
    }
  }

  label {
    position: absolute;
    right: -30px;
    top: 0;
    width: 2px;
    height: 30px;
    background-color: #000;
    cursor: pointer;
    transition: 0.4s ease-in-out;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translateX(-50%);
      width: 8px;
      height: 20px;
      background-color: #000;
      border-radius: 4px;
      transition: 0.4s ease-in-out;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -12px;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background-color: greenyellow;
      border-radius: 50%;
      transition: 0.4s;
      opacity: 0;
    }
  }

  .lamp {
    position: relative;
    margin: 0 auto;
    width: 14px;
    height: 150px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    background-repeat: no-repeat;
    background-size: 2px 100%, 20px 14px, 8px 30px;
    background-position: center bottom;

    &::before,
    &::after {
      content: "";
      position: absolute;
    }

    &::before {
      left: 50%;
      transform: translateX(-50%);
      bottom: -4rem;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.03);
      box-shadow: inset 2px -2px 10px rgba(100, 100, 100, 0.1);
      transition: all 0.2s;
    }

    .lamp_center {
      position: absolute;
      bottom: -26px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 26px;
      border-right: 4px solid rgba(255, 255, 255, 0.1);

      &::before {
        content: "";
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-34%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

const ToggleLamp = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const dispatch = useDispatch();

  return (
    <div css={lampStyles}>
      <input
        type="checkbox"
        name="lampSwitch"
        id="lampSwitch"
        checked={themeType === "light" ? true : false}
        onChange={(e) => {
          dispatch(
            setThemeType({
              themeType: themeType === "light" ? "dark" : "light",
            })
          );
        }}
      />

      <label htmlFor="lampSwitch"></label>

      <div className="lamp">
        <div className="lamp_center"></div>
      </div>
    </div>
  );
};

export default ToggleLamp;
