/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "components/common/Button";
import React from "react";
import { useTheme } from "@emotion/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { emotionStyledProps } from "types/emotionStyled";

interface PostListTitleProps {
  categoryName: string;
  postsLength: string;
}

const PostListTitle = ({ categoryName, postsLength }: PostListTitleProps) => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;

  return (
    <PostsTitle color={color}>
      <h2>
        {categoryName} <span>({postsLength})</span>
      </h2>

      <Button>
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
  border-bottom: 1px solid ${(props) => props.color};
  padding-bottom: 6px;

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
