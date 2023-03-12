import React from "react";
import MobileContainer from "../../components/common/MobileContainer";
import LoginForm from "components/login";

const Login = () => {
  const caption = (
    <>
      안녕하세요 <br />
      CardLog 입니다.
      <br />
      <br />
      <small>회원 서비스 이용을 위해 로그인 해주세요.</small>
    </>
  );

  return (
    <MobileContainer title={"로그인"} caption={caption}>
      <LoginForm />
    </MobileContainer>
  );
};

export default Login;
