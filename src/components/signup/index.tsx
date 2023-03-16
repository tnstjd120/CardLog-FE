/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { loginFormStyle } from "styles/components/login";
import InputText from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import axios from "axios";
import { LoginResponse, UserResponse } from "types/Login";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

const SignUpForm = () => {
  const [signUpStep, setSignUpStep] = useState<number>(1);

  const handleNextStep = () => {
    switch (signUpStep) {
      case 1:
        break;

      case 2:
        break;

      case 3:
        break;
    }

    setSignUpStep((prev) => prev + 1);
  };

  return (
    <>
      {signUpStep === 1 ? (
        <FirstStep setSignUpStep={setSignUpStep} />
      ) : signUpStep === 2 ? (
        <SecondStep setSignUpStep={setSignUpStep} />
      ) : (
        <ThirdStep setSignUpStep={setSignUpStep} />
      )}

      <MobileBottomButton onClick={() => setSignUpStep((prev) => prev + 1)}>
        다음
      </MobileBottomButton>
    </>
  );
};

export default SignUpForm;
