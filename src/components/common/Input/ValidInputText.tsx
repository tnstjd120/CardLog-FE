/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import { ThemeType } from "styles/emotion";
import theme from "styles/theme";
import InputText, { InputProps } from "./InputText";

type validType = "email" | "name" | "password" | "passwordConfirm" | "phone";

interface ValidInputTextProps extends InputProps {
  validType: validType;
  validTooltip: string;
  invalidTooltip: string;
  originPassword?: string | null;
}

const ValidInputText = React.forwardRef<HTMLInputElement, ValidInputTextProps>(
  (props, ref) => {
    const { validType, validTooltip, invalidTooltip, originPassword, ...rest } =
      props;
    const [isValid, setIsValid] = useState<boolean | null>(null);

    // FIXME ref를 컴포넌트 안으로 바꿨는데 이걸로 처리할 수 있는 부분 생각하기
    const inputRef = useRef<HTMLInputElement | null>(null);

    const regexObj = {
      email:
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      name: /^[가-힣]{2,5}$/, // 이름 2 ~ 5글자
      password:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, // 비밀번호 (최소 8자리 숫자,문자,특수문자 최소 1개),
      phone: /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/, // 휴대폰 번호 양식
    };

    const tooltipStyle = css`
      position: relative;

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
        top: 50%;
        color: ${palette.black1};
      }
    `;

    return (
      <div css={tooltipStyle}>
        <InputText
          {...rest}
          ref={inputRef}
          onChange={(e) => {
            console.log(validType, " == ", inputRef.current?.value);

            if (validType !== "passwordConfirm") {
              setIsValid(regexObj[validType].test(e.target.value));

              if (validType === "phone") {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                  .replace(/(\-{1,2})$/g, "");
              }
            } else {
              setIsValid(originPassword === e.target.value);
            }
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
