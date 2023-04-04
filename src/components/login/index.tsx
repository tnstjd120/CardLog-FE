/** @jsxImportSource @emotion/react */
import InputText from "components/common/Input/InputText";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import ButtonGroup from "./ButtonGroup";
import API_Path from "utils/path/API_Path";
import RouterInfo from "components/routes/RouterInfo";
import { loginFormStyle } from "styles/components/login";
import { accessApi } from "libs/axios";
import { useDispatch } from "react-redux";
import { setMyInfo } from "store/myInfo";
import { login } from "auth/jwtAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../common/Loading";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const reqData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const loginResponse = await login(reqData);

    setIsLoading(false);

    if (loginResponse === "OK") {
      accessApi
        .get(API_Path.USER_INFO)
        .then((res) => {
          dispatch(setMyInfo(res.data));
          navigate(`${RouterInfo.HOME.path}?blog_id=${res.data.blog_id}`, {
            replace: true,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {isLoading && <Loading />}
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
