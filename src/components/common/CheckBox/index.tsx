/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { ThemeType } from "styles/emotion";
import theme, { palette } from "styles/theme";
import { BsCheck } from "react-icons/bs";
import { HiChevronRight } from "react-icons/hi";

export interface CheckBoxProps {
  themeType?: ThemeType;
  children?: string | React.ReactElement;
  id?: string;
  name?: string;
  checked?: boolean;
  marginRight?: string;
  borderBottom?: boolean;
  arrowRight?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  customCss?: SerializedStyles;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  themeType,
  children,
  id,
  name,
  checked,
  marginRight = 0,
  borderBottom,
  arrowRight,
  size = "md",
  customCss = "",
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        css={css`
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 15px 0;
          border-bottom: ${borderBottom ? `1px solid ${palette.black2}` : 0};

          ${customCss}

          & input {
            display: none;
          }

          & i {
            display: block;
            border: 1px solid ${palette.gray0};
            border-radius: 4px;
            font-size: 1.4em;
            width: 20px;
            height: 20px;
            cursor: pointer;
            position: relative;

            & svg {
              display: none;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }

          & input:checked + i {
            background-color: ${palette.yellow};
            border: 1px solid ${palette.black4};

            & svg {
              display: block;
            }
          }

          & p {
            font-size: 1em;
            padding-left: 8px;
            color: ${palette.black2};
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            & svg {
              font-size: 1.5rem;
            }
          }
        `}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <i>
          <BsCheck />
        </i>

        <p>
          {children}
          {arrowRight && <HiChevronRight />}
        </p>
      </label>
    </>
  );
};

export default CheckBox;
