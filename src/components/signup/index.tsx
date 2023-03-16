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
  console.log("SignUpForm Render");
  const [signUpStep, setSignUpStep] = useState<number>(1);

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfoProps | null>(null);

  const [isFirstStep, setIsFirstStep] = useState<boolean>(false);
  const [isSecondStep, setIsSecondStep] = useState<boolean>(false);
  const [isThirdStep, setIsThirdStep] = useState<boolean>(false);

  const handleNextStep = () => {
    switch (signUpStep) {
      case 1:
        isFirstStep
          ? setSignUpStep((prev) => prev + 1)
          : Swal.fire({
              icon: "error",
              text: "필수 항목을 체크해주세요.",
              confirmButtonColor: palette.black4,
              confirmButtonText: "확인",
              focusConfirm: true,
            });
        break;

      case 2:
        break;

      case 3:
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Pagination signUpStep={signUpStep} setSignUpStep={setSignUpStep} />

      {signUpStep === 1 ? (
        <FirstStep setIsFirstStep={setIsFirstStep} />
      ) : signUpStep === 2 ? (
        <SecondStep
          setIsSecondStep={setIsSecondStep}
          setSignUpInfo={setSignUpInfo}
        />
      ) : (
        <ThirdStep setSignUpStep={setSignUpStep} />
      )}

      <MobileBottomButton onClick={handleNextStep}>다음</MobileBottomButton>
    </>
  );
};

export default SignUpForm;
