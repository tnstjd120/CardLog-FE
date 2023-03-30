/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import ToggleLamp from "components/common/Lamp";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import PostList from "components/posts/PostList";
import PostDetail from "components/posts/PostDetail";

const Posts = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;

  const [postId, setPostId] = useState<number>(0);

  return (
    <PostsWrap>
      <PostsContainer color={color}>
        {!postId ? (
          <PostList postId={postId} setPostId={setPostId} />
        ) : (
          <PostDetail postId={postId} setPostId={setPostId} />
        )}
      </PostsContainer>

      <RightArea>
        <div>
          <ToggleLamp />
        </div>

        <div className="news">개발뉴스</div>
      </RightArea>
    </PostsWrap>
  );
};

export default Posts;

const PostsWrap = styled.section`
  display: flex;
  width: 100%;
  height: 100%;

  & > div {
    /* width: 50%; */
    height: 100%;
    padding: 30px;
    padding-top: 0;
    position: relative;
  }
`;

const RightArea = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

  & > div:first-of-type {
    width: 100%;
    height: 40%;
  }

  & .news {
    width: 100%;
    height: 60%;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
`;

const PostsContainer = styled.div<emotionStyledProps>`
  width: 60%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background-color: ${(props) => props.color};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.color}30;
  }
`;