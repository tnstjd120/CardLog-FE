/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "components/common/Button";
import RouterInfo from "components/routes/RouterInfo";
import React from "react";
import { useNavigate } from "react-router-dom";
import { palette } from "styles/theme";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <IntroContainer>
      <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} alt="" />

      <p>CardLog 에 오신걸 환영합니다.</p>

      <div className="buttonGroup">
        <Button onClick={() => navigate(RouterInfo.LOGIN.path)}>
          로그인 하러가기
        </Button>
        <Button onClick={() => navigate(RouterInfo.SIGNUP.path)}>
          회원가입 하러가기
        </Button>
      </div>
    </IntroContainer>
  );
};

export default Intro;

const IntroContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 120px;
    margin-bottom: 80px;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 80px;
  }

  .buttonGroup {
    display: flex;
    justify-content: center;
    width: 100%;

    button {
      font-size: 1rem;
      padding: 12px 24px;
      border-radius: 6px;
      margin-left: 20px;
      background-color: transparent;
      border: 1px solid #ddd;

      &:hover {
        background-color: ${palette.yellow};
      }

      &:first-of-type {
        margin-left: 0;
      }
    }
  }
`;
