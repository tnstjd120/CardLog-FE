/** @jsxImportSource @emotion/react */

import React from "react";
import { sideBarStyle } from "../../../styles/components/SideBar";
import { Link, NavLink } from "react-router-dom";
import RouterInfo, { RouterItem } from "../../routes/RouterInfo";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";
import { MyInfoState } from "store/myInfo";
import { FaUserCircle, FaBlogger, FaGithubSquare } from "react-icons/fa";
import { ThemeStateProps } from "store/themeType";
import { css, useTheme } from "@emotion/react";

const SideBar: React.FC = (): JSX.Element => {
  const user = useSelector<RootState>((state) => state.user) as UserState;
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();

  return (
    <article
      css={css`
        ${sideBarStyle};
        background-color: ${theme[themeType].backgroundColor};
        color: ${theme[themeType].color};
      `}
    >
      <h2>
        <Link to={RouterInfo.HOME.path}>{user.blog_name}</Link>
      </h2>

      <figure>
        <div className="img_wrap">
          {user.profile_img ? (
            <img
              src="https://velog.velcdn.com/images/tnstjd120/profile/e1994e20-250c-4517-9c00-281ee42cd780/image.jpeg"
              alt=""
            />
          ) : (
            <FaUserCircle />
          )}
        </div>

        <figcaption>{user.username}</figcaption>
      </figure>

      <nav>
        {user.category.map((item) => (
          <NavLink
            key={item.id}
            to={`/posts/${item.id}/?blog_id=${user.blog_id}`}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="links">
        {user.link_list.map((item) => (
          <a key={item.id} href={item.url} target="_blank" rel="noreferrer">
            {item.icon_type === 0 ? <FaGithubSquare /> : <FaBlogger />}
          </a>
        ))}
      </div>
    </article>
  );
};

export default SideBar;
