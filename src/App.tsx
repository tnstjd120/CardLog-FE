/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import SideBar from "./components/common/SideBar";
import RoutesObject from "./components/routes";
import { useState } from "react";
import { useHasNav } from "./hooks/useHasNav";
import { useLocation } from "react-router-dom";

const mainStyles = css`
  display: flex;
  height: 100vh;
`;

const contentStyles = css`
  flex: auto;
  height: 100%;
  padding: 20px;
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
