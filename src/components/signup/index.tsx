/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import AgreeStep from "./AgreeStep";
import SecondStep from "./UserInfoStep";
import FinishStep from "./FinishStep";
import Pagination from "./Pagination";
import { api } from "libs/axios";
import API_Path from "utils/path/API_Path";

export interface SignUpInfoProps {
  email: string;
  username: string;
  password1: string;
  password2: string;
  phone: string;
  blog_id: string;
}

const SignUpForm = () => {
  const [signUpStep, setSignUpStep] = useState<number>(1);

  const [signUpInfo, setSignUpInfo] = useState<SignUpInfoProps | null>(null);

  useEffect(() => {
    console.log("signupForm render");
    if (signUpStep === 3) {
      handleSignUp();
    }
  }, [signUpInfo]);

  const handleSignUp = async () => {
    console.log("signup");
    await api
      .post(API_Path.SIGNUP, signUpInfo)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };

  return (
    <>
      <Pagination signUpStep={signUpStep} setSignUpStep={setSignUpStep} />

      {signUpStep === 1 ? (
        <AgreeStep setSignUpStep={setSignUpStep} />
      ) : signUpStep === 2 ? (
        <SecondStep
          setSignUpStep={setSignUpStep}
          setSignUpInfo={setSignUpInfo}
        />
      ) : (
        <FinishStep setSignUpStep={setSignUpStep} signUpInfo={signUpInfo} />
      )}
    </>
  );
};

export default SignUpForm;
