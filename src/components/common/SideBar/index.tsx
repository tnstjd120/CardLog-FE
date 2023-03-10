/** @jsxImportSource @emotion/react */

import React from "react";
import { sideBarStyle } from "../../../styles/components/SideBar";
import { NavLink } from "react-router-dom";
import RouterInfo, { RouterItem } from "../../routes/RouterInfo";

const SideBar: React.FC = (): JSX.Element => {
  return (
    <article css={sideBarStyle}>
      <nav>
        {Object.entries(RouterInfo).map(
          ([key, item]: [string, RouterItem]) =>
            item.isNavIn && (
              <NavLink key={item.path} to={item.path}>
                {item.label}
              </NavLink>
            )
        )}
      </nav>
    </article>
  );
};

export default SideBar;
