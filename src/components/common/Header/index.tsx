/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import RouterInfo from "components/routes/RouterInfo";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { MyInfoState } from "store/myInfo";
import { getCookie } from "utils/cookie/universal-cookie";
import Button from "../Button";
import HeaderDropDownButton from "./HeaderDropDownButton";
import ProfileImg from "../ProfileImg";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refresh");
  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;

  return (
    <HeaderContainer>
      <Logo>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="" />
        <span>ardLog</span>
      </Logo>

      {refreshToken ? (
        <HeaderDropDownButton>
          <ProfileImg path={myInfo.profile_img} />
        </HeaderDropDownButton>
      ) : (
        <Button
          customCss={css`
            background-color: transparent;
            color: inherit;
          `}
          onClick={() => navigate(RouterInfo.LOGIN.path)}
        >
          로그인
        </Button>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  height: 5vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: fixed;
  z-index: 3;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  color: inherit;
`;

const Logo = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 300;
  span {
    text-indent: 4px;
  }
`;
