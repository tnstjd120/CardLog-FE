/** @jsxImportSource @emotion/react */
import InputText from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import ButtonGroup from "./ButtonGroup";
import API_Path from "utils/path/API_Path";
import RouterInfo from "components/routes/RouterInfo";
import { useState } from "react";
import { loginFormStyle } from "styles/components/login";
import { accessApi } from "libs/axios";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { MyInfoState, setMyInfo } from "store/myInfo";
import { login } from "auth/jwtAuth";
import { getCookie } from "utils/cookie/universal-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const reqData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const loginResponse = await login(reqData);

    if (loginResponse === "OK") {
      await accessApi
        .get(API_Path.USER_INFO)
        .then((res) => {
          dispatch(setMyInfo(res.data));
        })
        .catch((error) => console.log(error));

      navigate(RouterInfo.HOME.path, { replace: true });
    }
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
