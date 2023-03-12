/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";

interface InputProps {
  themeType: ThemeType;
  value?: string;
  marginBottom?: string;
  type?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
}

const InputText: React.FC<InputProps> = ({
  themeType,
  value,
  name,
  marginBottom = "20px",
  type = "text",
  size = "md",
  placeholder = "",
}) => {
  const inputStyle = css`
    font-size: 1rem;
    border: 0;
    border-bottom: 1px solid ${palette.black4};
    padding: 10px 6px;
    width: 100%;
    background-color: transparent;
    color: ${theme[themeType].color};
    outline: none;
    margin-bottom: ${marginBottom};

    &:focus {
      border-bottom: 1px solid ${palette.black1};
    }
  `;

  return (
    <>
      <input
        type={type}
        name={name}
        css={inputStyle}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
};

export default InputText;
