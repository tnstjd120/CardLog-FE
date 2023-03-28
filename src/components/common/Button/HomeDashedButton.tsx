/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import { ButtonProps } from ".";
import theme from "styles/theme";
import Button from ".";

const HomeDashedButton = (props: ButtonProps) => {
  return (
    <>
      <Button
        customCss={css`
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23999999FF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='27' stroke-linecap='round'/%3e%3c/svg%3e");
          border-radius: 5px;
          min-width: 70px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          position: sticky;
          left: 0;
          top: 30px;
          color: ${palette.black4};

          &:hover {
            background-color: rgba(0, 0, 0, 0.1);
            color: ${palette.black1};
          }
        `}
        {...props}
      />
    </>
  );
};

export default HomeDashedButton;
