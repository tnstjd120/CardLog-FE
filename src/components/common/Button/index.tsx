/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";

export interface ButtonProps {
  themeType?: ThemeType;
  children?: string | JSX.Element | any;
  icon?: React.ReactElement;
  type?: "button" | "submit";
  marginRight?: string;
  size?: "sm" | "md" | "lg";
  isBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  customCss?: SerializedStyles;
}

const Button: React.FC<ButtonProps> = ({
  themeType,
  children,
  icon,
  type,
  marginRight = 0,
  size = "md",
  isBorder = false,
  customCss = "",
  onClick,
}) => {
  return (
    <>
      <button
        css={css`
          font-size: 1rem;
          border: 0;
          background-color: ${themeType && theme[themeType].backgroundColor};
          color: ${themeType && theme[themeType].color};
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: 0.3s;
          ${customCss}
        `}
        type={type}
        onClick={onClick}
      >
        {icon && icon}
        {children && children}
      </button>
    </>
  );
};

export default Button;
