/** @jsxImportSource @emotion/react */
import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "@emotion/styled";
import ToggleLamp from "components/common/Lamp";
import PostListTitle from "components/postlist/PostListTitle";
import { useLocation } from "react-router-dom";
import { api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import { PostResponseProps } from "types/Post";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";

const PostList = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;

  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get(
    "category"
  ) as string;

  const [posts, setPosts] = useState<PostResponseProps[]>([]);

  const readPosts = async () => {
    await api
      .get(`${API_Path.POSTS}?category=${categoryId}`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    readPosts();
  }, []);

  return (
    <PostsWrap>
      <PostsContainer>
        <PostListTitle categoryName="React " postsLength="22" />

        <Posts color={color}>
          {posts.map((post) => (
            <li key={post.id}>
              {post.thumbnail && (
                <div className="img_wrap">
                  <img
                    src={`https://cardlog-bucket.s3.amazonaws.com/${post.thumbnail}`}
                    alt="post_thumbnail"
                  />
                </div>
              )}

              <dl>
                <dt>{post.title}</dt>
                <dd>{post.content}</dd>
              </dl>
            </li>
          ))}
        </Posts>
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

export default PostList;

const PostsWrap = styled.section`
  display: flex;
  width: 100%;
  height: 100%;

  & > div {
    width: 50%;
    height: 100%;
    padding: 30px;
  }
`;

const PostsContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const RightArea = styled.div`
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

const Posts = styled.ul<emotionStyledProps>`
  width: 100%;
  padding: 30px 0;

  li {
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => props.color};

    .img_wrap {
      width: 100%;
      height: 300px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    dl {
      padding: 20px 10px;
    }
  }
`;
