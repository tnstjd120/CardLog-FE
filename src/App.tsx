/** @jsxImportSource @emotion/react */
import React from "react";

import { css } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";

import SideBar from "./components/common/SideBar";
import Home from "./pages/Home";
import MyInfo from "./pages/MyInfo";
import PostDetail from "./pages/PostDetail";
import PrivateRoute from "./components/routes/PrivateRouter";
import RouterInfo, { RouterItem } from "./components/routes/RouterInfo";

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
  return (
    <>
      <GlobalStyles />

      <main css={mainStyles}>
        <SideBar />

        <div css={contentStyles}>
          <Routes>
            {RouterInfo.map((item: RouterItem) => {
              return (
                <Route
                  key={item.path}
                  path={item.path}
                  element={
                    item.isLoggedIn ? (
                      <PrivateRoute>{item.element}</PrivateRoute>
                    ) : (
                      <>{item.element}</>
                    )
                  }
                />
              );
            })}
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
