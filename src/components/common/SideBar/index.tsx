/** @jsxImportSource @emotion/react */

import React from "react";
import { sideBarStyle } from "../../../styles/components/SideBar";
import { Link, NavLink } from "react-router-dom";
import RouterInfo, { RouterItem } from "../../routes/RouterInfo";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";

const SideBar: React.FC = (): JSX.Element => {
  const userInfo = useSelector<RootState>((state) => state.user) as UserState;
  console.log(userInfo);
  return (
    <article css={sideBarStyle}>
      <h2>
        <Link to={RouterInfo.HOME.path}>{userInfo.blog_name}</Link>
      </h2>

      <figure>
        <div className="img_wrap">
          <img
            src="https://velog.velcdn.com/images/tnstjd120/profile/e1994e20-250c-4517-9c00-281ee42cd780/image.jpeg"
            alt=""
          />
        </div>

        <figcaption>{userInfo.username}</figcaption>
      </figure>

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
