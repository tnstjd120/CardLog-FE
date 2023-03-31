/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { ThemeType } from "styles/emotion";
import theme, { palette } from "styles/theme";
import { BsCheck } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export interface CheckBoxProps {
  themeType?: ThemeType;
  children?: string | React.ReactElement;
  id?: string;
  name?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  marginRight?: string;
  borderBottom?: boolean;
  arrowRight?: boolean;
  textLeft?: boolean;
  size?: "sm" | "md" | "lg";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  customCss?: SerializedStyles;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      themeType,
      children,
      id,
      name,
      defaultChecked,
      checked,
      marginRight = 0,
      borderBottom,
      arrowRight,
      textLeft = false,
      size = "md",
      customCss = "",
      onChange,
    },
    ref
  ) => {
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
              min-width: 20px;
              min-height: 20px;
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
          {textLeft && (
            <p>
              {children}
              {arrowRight && <HiChevronLeft />}
            </p>
          )}

          <input
            type="checkbox"
            id={id}
            name={name}
            defaultChecked={defaultChecked}
            checked={checked}
            ref={ref}
            onChange={onChange}
          />
          <i>
            <BsCheck />
          </i>

          {!textLeft && (
            <p>
              {children}
              {arrowRight && <HiChevronRight />}
            </p>
          )}
        </label>
      </>
    );
  }
);

export default CheckBox;
