import SignUpForm from "components/signup";
import React from "react";
import MobileContainer from "../../components/common/MobileContainer";

const SignUp = () => {
  const caption = <>회원가입</>;

  return (
    <MobileContainer title={"회원가입"} caption={caption}>
      <SignUpForm />
    </MobileContainer>
  );
};

export default SignUp;
