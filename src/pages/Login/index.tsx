import React, { useEffect, useLayoutEffect } from "react";
import MobileContainer from "../../components/common/MobileContainer";
import LoginForm from "components/login";
import { getCookie } from "utils/cookie/universal-cookie";
import { useNavigate } from "react-router-dom";
import RouterInfo from "components/routes/RouterInfo";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { MyInfoState } from "store/myInfo";

const Login = () => {
  const navigate = useNavigate();
  const blogId = useSelector<RootState>(
    (state) => state.myInfo.blog_id
  ) as MyInfoState;

  useEffect(() => {
    getCookie("refresh") &&
      navigate(`${RouterInfo.HOME.path}?blog_id=${blogId}`);
  }, []);

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
