/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Lamp from "components/common/Lamp";
import PostList from "components/posts/PostList";
import PostDetail from "components/posts/PostDetail";
import PostRanking from "components/posts/PostRanking";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";

interface postsEmotionStyledProps extends emotionStyledProps {
  postId?: number;
}

const Posts = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;

  const [postId, setPostId] = useState<number>(0);

  return (
    <PostsWrap>
      <PostsContainer color={color} postId={postId}>
        <PostList postId={postId} setPostId={setPostId} />

        {!!postId && <PostDetail postId={postId} setPostId={setPostId} />}
      </PostsContainer>

      <RightArea>
        <div>
          <Lamp />
        </div>

        <PostRanking />
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
`;

const PostsContainer = styled.div<postsEmotionStyledProps>`
  width: 60%;
  height: 100%;
  overflow: ${(props) => (props.postId ? "hidden" : "auto")};

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
