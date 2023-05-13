/** @jsxImportSource @emotion/react */
import { Dispatch } from "react";
import { FinishStepStyles } from "styles/components/signup";
import { SignUpInfoProps } from ".";

interface secondStepProps {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
  signUpInfo: SignUpInfoProps | null;
}

const FinishStep = ({ setSignUpStep, signUpInfo }: secondStepProps) => {
  return (
    <>
      <p css={FinishStepStyles}>
        입력하신 이메일로 인증메일을 전송해드렸습니다. <br /> <br />
        이메일 인증 완료 후 로그인이 가능합니다.
      </p>
    </>
  );
};

export default FinishStep;
