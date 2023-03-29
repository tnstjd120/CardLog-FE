/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";

export interface InputProps {
  themeType?: ThemeType;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  marginBottom?: string;
  type?: string;
  name?: string;
  maxLength?: number;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  customCss?: SerializedStyles;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      themeType = "light",
      value,
      defaultValue,
      name,
      required = false,
      maxLength,
      marginBottom = "20px",
      type = "text",
      disabled = false,
      size = "md",
      placeholder = "",
      customCss = "",
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
      ${customCss}

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
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
        />
      </>
    );
  }
);

export default InputText;
