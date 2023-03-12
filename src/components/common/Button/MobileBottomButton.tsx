/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import { ButtonProps } from ".";
import theme from "styles/theme";
import Button from ".";

const MobileBottomButton = (props: ButtonProps) => {
  return (
    <>
      <Button
        customCss={css`
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 50px;
          background-color: ${palette.yellow};

          &:hover {
            background-color: ${palette.hoverYellow};
          }
        `}
        {...props}
      />
    </>
  );
};

export default MobileBottomButton;
