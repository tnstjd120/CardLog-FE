/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import RouterInfo from "../../routes/RouterInfo";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import AddCategory from "./AddCategory";
import { MyInfoState } from "store/myInfo";

const Nav: React.FC = (): JSX.Element => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;
  const hoverBackgroundColor = theme[themeType].hoverBackgroundColor;
  const hoverColor = theme[themeType].hoverColor;

  const user = useSelector<RootState>((state) => state.user) as UserState;
  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;

  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("category");
  const blogId = new URLSearchParams(location.search).get("blog_id");

  return (
    <NavContainer
      hoverBackgroundColor={hoverBackgroundColor}
      hoverColor={hoverColor}
      color={color}
    >
      {user.category.map((item) => (
        <Link
          key={item.id}
          to={`${RouterInfo.POST_LIST.path}/?blog_id=${user.blog_id}&category=${item.id}`}
          className={categoryId === item.id + "" ? "active" : "unactive"}
        >
          {item.name}
        </Link>
      ))}

      {blogId === myInfo.blog_id && <AddCategory />}
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.nav<emotionStyledProps>`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  padding-bottom: 30px;
  overflow: auto;

  a {
    border-bottom: 1px solid #ddd;
    display: block;
    height: 100%;
    padding: 10px 20px;
    color: inherit;

    &.active {
      background-color: ${(props) => props.hoverBackgroundColor};
    }

    &:hover {
      background-color: ${(props) => props.hoverBackgroundColor};
    }
  }
`;
