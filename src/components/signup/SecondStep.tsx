/** @jsxImportSource @emotion/react */
import { useState, useRef, Dispatch, ChangeEvent, useEffect } from "react";
import InputText from "components/common/Input/InputText";
import { SignUpInfoProps } from ".";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import ValidInputText from "components/common/Input/ValidInputText";
import { css } from "@emotion/react";
import { useDebounce } from "hooks/useDebounce";

interface secondStepProps {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
  setSignUpInfo: Dispatch<React.SetStateAction<SignUpInfoProps | null>>;
}

const SecondStep = ({ setSignUpStep, setSignUpInfo }: secondStepProps) => {
  console.log("secondStep Render");
  // const userEmailRef = useRef<HTMLInputElement | null>(null);
  // const userNameRef = useRef<HTMLInputElement | null>(null);
  // const userPasswordRef = useRef<HTMLInputElement | null>(null);
  // const userPasswordConfirmRef = useRef<HTMLInputElement | null>(null);
  // const userPhoneRef = useRef<HTMLInputElement | null>(null);

  const [originPassword, setOriginPassword] = useState<string | null>("");
  // const []

  const handleSecondStepClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    // setSignUpInfo({
    //   email: userEmailRef.current?.value ?? "",
    //   name: userNameRef.current?.value ?? "",
    //   password: userPasswordConfirmRef.current?.value ?? "",
    //   phone: userPhoneRef.current?.value ?? "",
    // });
  };

  return (
    <form
      css={css`
        width: 100%;
      `}
    >
      <ValidInputText
        type="email"
        name="email"
        placeholder="이메일"
        validType="email"
        validTooltip="이메일 형식에 적합합니다."
        invalidTooltip="이메일 형식에 적합하지 않습니다."
      />

      <ValidInputText
        type="text"
        name="name"
        placeholder="이름"
        validType="name"
        validTooltip="이름 형식에 적합합니다."
        invalidTooltip="이름 형식에 적합하지 않습니다."
      />

      <ValidInputText
        type="password"
        name="password"
        placeholder="비밀번호"
        validType="password"
        validTooltip="비밀번호 형식에 적합합니다."
        invalidTooltip="비밀번호 형식에 적합하지 않습니다."
        onBlur={(e) => setOriginPassword(e.target.value)}
      />

      <ValidInputText
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        validType="passwordConfirm"
        validTooltip="비밀번호가 일치합니다."
        invalidTooltip="비밀번호가 일치하지 않습니다."
        originPassword={originPassword}
      />

      <ValidInputText
        type="text"
        name="phone"
        placeholder="휴대폰 번호"
        validType="phone"
        validTooltip="휴대폰 번호 형식에 적합합니다."
        invalidTooltip="휴대폰 번호 형식에 적합하지 않습니다."
      />

      <MobileBottomButton onClick={(e) => handleSecondStepClick(e)}>
        다음
      </MobileBottomButton>
    </form>
  );
};

export default SecondStep;
