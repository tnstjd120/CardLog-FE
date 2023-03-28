/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useHasNav } from "./hooks/useHasNav";
import { useLocation } from "react-router-dom";

import SideBar from "./components/common/SideBar";
import RoutesObject from "./components/routes";
import { useUserInfo } from "hooks/useUserInfo";
import { contentStyles, mainStyles } from "styles/AppStyles";
import Header from "components/common/Header";
import { useEffect, useState } from "react";
import { ThemeType } from "styles/emotion";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";

function App() {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  useEffect(() => {
    localStorage.setItem("themeType", themeType);
  }, [themeType]);

  const { pathname } = useLocation();
  const theme = useTheme();

  useUserInfo();

  return (
    <>
      <GlobalStyles />

      <Header />

      <main css={mainStyles}>
        {useHasNav(pathname) && <SideBar />}
        <div
          css={css`
            ${contentStyles};
            background-color: ${theme[themeType].backgroundColor};
            color: ${theme[themeType].color};
          `}
        >
          {RoutesObject()}
        </div>
      </main>
    </>
  );
}

export default App;
