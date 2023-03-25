/** @jsxImportSource @emotion/react */
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useHasNav } from "./hooks/useHasNav";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import user, { setUser } from "store/user";

import SideBar from "./components/common/SideBar";
import RoutesObject from "./components/routes";
import { api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import { useUserInfo } from "hooks/useUserInfo";
import { RootState } from "store";

const mainStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: calc(100vh);
  margin: 0 auto;
  border-radius: 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
`;

const contentStyles = css`
  flex: auto;
  height: 100%;
`;

function App() {
  const { pathname } = useLocation();
  useUserInfo();
  return (
    <>
      <GlobalStyles />

      <main css={mainStyles}>
        {useHasNav(pathname) && <SideBar />}
        <div css={contentStyles}>{RoutesObject()}</div>
      </main>
    </>
  );
}

export default App;
