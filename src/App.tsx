/** @jsxImportSource @emotion/react */
import { css, ThemeProvider, useTheme } from "@emotion/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useHasNav } from "./hooks/useHasNav";
import { useLocation } from "react-router-dom";

import SideBar from "./components/common/SideBar";
import RoutesObject from "./components/routes";

const mainStyles = css`
  display: flex;
  height: 100vh;
`;

const contentStyles = css`
  flex: auto;
  height: 100%;
`;

function App() {
  const { pathname } = useLocation();

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
