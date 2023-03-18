/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";

export interface InputProps {
  themeType?: ThemeType;
  value?: string;
  ref?: React.RefObject<HTMLInputElement>;
  marginBottom?: string;
  type?: string;
  name?: string;
  maxLength?: number;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      themeType = "light",
      value,
      name,
      required = false,
      maxLength,
      marginBottom = "20px",
      type = "text",
      size = "md",
      placeholder = "",
      onChange,
      onBlur,
    },
    ref
  ) => {
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
          ref={ref}
          css={inputStyle}
          placeholder={placeholder}
          value={value}
          required={required}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
        />
      </>
    );
  }
);

export default InputText;
