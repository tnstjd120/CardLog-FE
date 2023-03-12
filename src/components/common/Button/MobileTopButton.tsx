/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ThemeType } from "styles/emotion";
import { ButtonProps } from ".";
import theme from "styles/theme";
import Button from ".";

const MobileTopButton = (props: ButtonProps) => {
  return (
    <>
      <Button
        customCss={css`
          background-color: transparent;
          color: #fff;
        `}
        {...props}
      />
    </>
  );
};

export default MobileTopButton;
