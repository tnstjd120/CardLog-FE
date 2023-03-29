import RouterInfo from "components/routes/RouterInfo";
import SignUpForm from "components/signup";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { MyInfoState } from "store/myInfo";
import { getCookie } from "utils/cookie/universal-cookie";
import MobileContainer from "../../components/common/MobileContainer";

const SignUp = () => {
  const navigate = useNavigate();
  const blogId = useSelector<RootState>(
    (state) => state.myInfo.blog_id
  ) as MyInfoState;

  useEffect(() => {
    getCookie("refresh") &&
      navigate(`${RouterInfo.HOME.path}?blog_id=${blogId}`);
  }, []);

  const caption = <>회원가입</>;

  return (
    <MobileContainer title={"회원가입"} caption={caption}>
      <SignUpForm />
    </MobileContainer>
  );
};

export default SignUp;
