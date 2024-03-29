/** @jsxImportSource @emotion/react */
import { useTheme } from "@emotion/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useHasNav } from "./hooks/useHasNav";
import { useLocation } from "react-router-dom";
import { useUserInfo } from "hooks/useUserInfo";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { emotionStyledProps } from "types/emotionStyled";
import SideBar from "./components/common/SideBar";
import RoutesObject from "./components/routes";
import styled from "@emotion/styled";
import Header from "components/common/Header";
import axios from "axios";

function App() {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";

  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  useEffect(() => {
    localStorage.setItem("themeType", themeType);
  }, [themeType]);

  const { pathname } = useLocation();
  const theme = useTheme();

  const bgColor = theme[themeType].backgroundColor;
  const textColor = theme[themeType].color;
  const boxShadow = theme[themeType].boxShadow;

  useUserInfo();

  return (
    <>
      <GlobalStyles />

      <Wrap backgroundColor={bgColor} color={textColor}>
        {useHasNav(pathname) && <Header />}

        <Main boxShadow={boxShadow}>
          {useHasNav(pathname) && <SideBar />}

          <Content>{RoutesObject()}</Content>
        </Main>
      </Wrap>
    </>
  );
}

export default App;

const Wrap = styled.div<emotionStyledProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  width: 100%;
  height: 100vh;
  padding-top: 5vh;
  transition: 0.4s;
`;

const Main = styled.main<emotionStyledProps>`
  box-shadow: ${(props) => props.boxShadow};
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 90%;
  margin: 0 auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: inherit;
  /* box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1); */
`;

const Content = styled.div`
  background-color: inherit;
  color: inherit;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.4s;
`;
