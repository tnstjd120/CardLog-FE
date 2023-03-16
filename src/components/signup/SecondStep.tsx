/** @jsxImportSource @emotion/react */
import { useState, Dispatch } from "react";
import { loginFormStyle } from "styles/components/login";
import InputText from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import axios from "axios";
import { LoginResponse, UserResponse } from "types/Login";

const SecondStep = (props: {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
}) => {
  return <></>;
};

export default SecondStep;
