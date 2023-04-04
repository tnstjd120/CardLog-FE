/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";
import InputText, { InputProps } from "./InputText";
import { validObjProps } from "components/signup/validObj";

type validType =
  | "email"
  | "username"
  | "password"
  | "passwordConfirm"
  | "phone"
  | "blog_id";

interface ValidInputTextProps extends InputProps {
  validType: validType;
  validTooltip: string;
  validObj: validObjProps;
  invalidTooltip: string;
}

const ValidInputText = React.forwardRef<HTMLInputElement, ValidInputTextProps>(
  (props, ref) => {
    const { validType, validTooltip, validObj, invalidTooltip, ...rest } =
      props;
    const [isValid, setIsValid] = useState<boolean | null>(null);

    // FIXME ref를 컴포넌트 안으로 바꿨는데 이걸로 처리할 수 있는 부분 생각하기
    const inputRef = useRef<HTMLInputElement | null>(null);

    const tooltipStyle = css`
      position: relative;
      margin-bottom: 30px;

      & input {
        border-bottom: 1px solid
          ${isValid !== null
            ? isValid
              ? palette.success
              : palette.danger
            : palette.black4} !important;

        & + small {
          color: ${isValid ? palette.success : palette.danger};
        }
      }

      & small {
        position: absolute;
        left: 6px;
        bottom: 0;
        color: ${palette.black1};
      }
    `;

    return (
      <div css={tooltipStyle}>
        <InputText
          {...rest}
          ref={inputRef}
          onChange={(e) => {
            if (validType !== "passwordConfirm") {
              setIsValid(validObj[validType].regexp.test(e.target.value));

              if (validType === "phone") {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                  .replace(/(\-{1,2})$/g, "");
              }
            } else {
              setIsValid(validObj.password.value === e.target.value);
            }
          }}
          onBlur={(e) => {
            validObj[validType].isTest = isValid;
            validObj[validType].value = e.target.value;
            validType === "passwordConfirm" &&
              setIsValid(validObj.password.value === e.target.value);
          }}
        />
        {/* FIXME 비밀번호 확인까지 작성 후 다시 비밀번호를 변경했을 때 비밀번호 확인 부분 일치하지 않는 부분 기능 작업 해야함. */}

        <small>
          {isValid !== null && (isValid ? validTooltip : invalidTooltip)}
        </small>
      </div>
    );
  }
);

export default ValidInputText;
