/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";
import { IconType } from "react-icons";

interface ButtonProps {
  themeType: ThemeType;
  children: string | React.ReactNode;
  marginRight?: string;
  size?: "sm" | "md" | "lg";
  isBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  themeType,
  children,
  marginRight = 0,
  size = "md",
  isBorder = false,
  onClick,
}) => {
  const buttonStyle = css`
    font-size: 20px;
    border: 0;
    background-color: ${theme[themeType].backgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
  `;

  return (
    <>
      <button css={buttonStyle} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Button;
