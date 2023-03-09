import React from "react";
import MobileContainer from "../../components/common/MobileContainer";
import LogoSvg from "../../assets/logo.svg";

const Login = () => {
  return (
    <MobileContainer className="login">
      <figure className="logo">{/* <img src={LogoSvg} alt="" /> */}</figure>
    </MobileContainer>
  );
};

export default Login;
