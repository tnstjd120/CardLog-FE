/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "components/common/Button";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { emotionStyledProps } from "types/emotionStyled";
import { api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import { useNavigate } from "react-router-dom";
import RouterInfo from "components/routes/RouterInfo";

interface PostListTitleProps {
  categoryId: string | number;
  postsLength: string | number;
}

const PostListTitle = ({ categoryId, postsLength }: PostListTitleProps) => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;
  const backgroundColor = theme[themeType].backgroundColor;

  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    readCategoryName();
  }, [categoryId]);

  const readCategoryName = async () => {
    await api
      .get(`${API_Path.CATEGORY}${categoryId}/`)
      .then((res) => {
        setCategoryName(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <PostsTitle color={color} backgroundColor={backgroundColor}>
      <h2>
        {categoryName} <span>({postsLength})</span>
      </h2>

      <Button onClick={() => navigate(RouterInfo.WRITE.path)}>
        <AiOutlinePlus />
        글쓰기
      </Button>
    </PostsTitle>
  );
};

export default PostListTitle;

const PostsTitle = styled.div<emotionStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  background-color: ${(props) => props.backgroundColor};
  border-bottom: 1px solid ${(props) => props.color};
  transition: 0.4s;
  padding-bottom: 6px;
  position: sticky;
  top: 0;
  padding-top: 30px;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    span {
      font-size: 0.7em;
      font-weight: 400;
    }
  }

  button {
    color: inherit;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      text-decoration: underline;
    }
  }
`;
