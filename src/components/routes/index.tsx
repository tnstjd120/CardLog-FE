import { Route, Routes } from "react-router-dom";
import RouterInfo, { RouterItem } from "./RouterInfo";
import PrivateRoute from "./PrivateRouter";
import React from "react";

const RoutesObject = (): JSX.Element => {
  return (
    <Routes>
      {Object.entries(RouterInfo).map(([key, item]: [string, RouterItem]) => {
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
  );
};

export default RoutesObject;
