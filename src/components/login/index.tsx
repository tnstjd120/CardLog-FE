/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { loginFormStyle } from "styles/components/login";
import InputText from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import ButtonGroup from "./ButtonGroup";
import { LoginResponse } from "types/Login";
import api from "libs/axios";
import API_Path from "utils/path/API_Path";
import Swal from "sweetalert2";
import { palette } from "styles/theme";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setMyInfo } from "store/myInfo";
import { useCookies } from "react-cookie";
import axios from "axios";
import { login } from "auth/jwtAuth";
import { getCookie } from "utils/cookie/universal-cookie";
import { useNavigate } from "react-router-dom";
import RouterInfo from "components/routes/RouterInfo";

const LoginForm = () => {
  const user = useSelector((state: RootState) => state.myInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const reqData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    await login(reqData);

    if (getCookie("access")) navigate(RouterInfo.HOME.path, { replace: true });
  };

  return (
    <>
      <form css={loginFormStyle} onSubmit={handleLoginSubmit}>
        <InputText
          themeType="light"
          type="email"
          name="email"
          placeholder="이메일"
          marginBottom="30px"
        />
        <InputText
          themeType="light"
          type="password"
          name="password"
          placeholder="비밀번호"
        />

        <ButtonGroup />

        <MobileBottomButton type="submit">로그인</MobileBottomButton>
      </form>
    </>
  );
};

export default LoginForm;
