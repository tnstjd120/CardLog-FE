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
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import { palette } from "styles/theme";

export interface SignUpInfoProps {
  email: string;
  name: string;
  password: string;
  phone: string;
}

const SignUpForm = () => {
  const [signUpStep, setSignUpStep] = useState<number>(1);

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfoProps | null>(null);

  return (
    <>
      <Pagination signUpStep={signUpStep} setSignUpStep={setSignUpStep} />

      {signUpStep === 1 ? (
        <FirstStep setSignUpStep={setSignUpStep} />
      ) : signUpStep === 2 ? (
        <SecondStep
          setSignUpStep={setSignUpStep}
          setSignUpInfo={setSignUpInfo}
        />
      ) : (
        <ThirdStep setSignUpStep={setSignUpStep} />
      )}
    </>
  );
};

export default SignUpForm;
