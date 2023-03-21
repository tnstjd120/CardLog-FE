/** @jsxImportSource @emotion/react */
import { useState, Dispatch } from "react";
import { loginFormStyle } from "styles/components/login";
import InputText, { InputProps } from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import axios from "axios";
import { LoginResponse, UserResponse } from "types/Login";
import { SignUpInfoProps } from ".";
import { css } from "@emotion/react";

interface secondStepProps {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
  signUpInfo: SignUpInfoProps | null;
}

const ThirdStep = ({ setSignUpStep, signUpInfo }: secondStepProps) => {
  const CustomInput: React.FC<InputProps> = (props) => {
    return (
      <InputText
        customCss={css`
          width: 150px;
          text-align: center;
          margin-top: 30px;
        `}
        {...props}
      />
    );
  };

  return (
    <>
      <p>입력하신 이메일로 인증번호를 전송해드렸습니다.</p>

      <CustomInput placeholder="인증번호" />

      <MobileBottomButton onClick={(e) => {}}>다음</MobileBottomButton>
    </>
  );
};

export default ThirdStep;
