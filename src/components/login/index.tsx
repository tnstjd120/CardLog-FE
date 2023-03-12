/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { loginFormStyle } from "styles/components/login";
import InputText from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import ButtonGroup from "./ButtonGroup";
import axios from "axios";

type LoginSuccessMessage = "SUCCESS";
type loginFailMessage = "FAIL";

interface UserResponse {
  email: string;
  password: string;
}

interface LoginResponse {
  message: LoginSuccessMessage | loginFailMessage;
  token: string;
  userInfo: UserResponse;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  const user: UserResponse = { email: email, password: password };

  return user
    ? {
        message: "SUCCESS",
        token: "dsafdsafdsa2414",
        userInfo: { email: user.email, password: user.password },
      }
    : null;
};

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState<UserResponse>({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginRes = await login(
      formData.get("email") as string,
      formData.get("password") as string
    );

    if (!loginRes) return;

    setUserInfo(loginRes.userInfo);
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
