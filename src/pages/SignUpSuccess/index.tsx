import MobileBottomButton from "components/common/Button/MobileBottomButton";
import RouterInfo from "components/routes/RouterInfo";
import React from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../../components/common/MobileContainer";

const SignUpSuccess = () => {
  const navigate = useNavigate();
  const caption = <>회원가입</>;

  return (
    <MobileContainer title={"회원가입"} caption={caption}>
      <p>회원가입이 완료되었습니다 🎉</p>

      <MobileBottomButton onClick={(e) => navigate(RouterInfo.LOGIN.path)}>
        로그인하기
      </MobileBottomButton>
    </MobileContainer>
  );
};

export default SignUpSuccess;
