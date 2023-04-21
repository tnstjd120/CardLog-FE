/** @jsxImportSource @emotion/react */
import React, { SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import API_Path from "utils/path/API_Path";
import Loading from "components/common/Loading";
import PostListTitle from "./PostListTitle";
import { useLocation } from "react-router-dom";
import { api } from "libs/axios";
import { PostResponseProps } from "types/Post";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import { days } from "utils/date/days";
import { BiComment } from "react-icons/bi";
import { Viewer } from "@toast-ui/react-editor";

interface PostListProps {
  postId: number;
  setPostId: React.Dispatch<SetStateAction<number>>;
}

const PostList = ({ postId, setPostId }: PostListProps) => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;
  const hoverBackgroundColor = theme[themeType].hoverBackgroundColor;

  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get(
    "category"
  ) as string;
  const blogId = new URLSearchParams(location.search).get("blog_id") as string;

  const [posts, setPosts] = useState<PostResponseProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    readPosts();
  }, [categoryId]);

  const readPosts = () => {
    setIsLoading(true);

    api
      .get(`${API_Path.POSTS}?blog_id=${blogId}&category=${categoryId}`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <PostListTitle categoryId={categoryId} postsLength={posts.length} />

        <PostsContainer
          color={color}
          hoverBackgroundColor={hoverBackgroundColor}
        >
          {posts.length ? (
            posts.map((post) => (
              <li
                key={post.id}
                onClick={() => {
                  setPostId(post.id);
                }}
              >
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
                  <dd>
                    <Viewer initialValue={post.content} />
                  </dd>
                  {/* <dd>{post.content}</dd> */}
                </dl>
                <div>
                  <span>{days(post.create_at)}</span>
                  <span>
                    <BiComment /> <strong>0</strong>
                  </span>
                </div>
              </li>
            ))
          ) : (
            <h3>게시물이 없습니다.</h3>
          )}
        </PostsContainer>
      </>
    );
  }
};

export default PostList;

const PostsContainer = styled.ul<emotionStyledProps>`
  width: 100%;
  padding: 30px 0;

  li {
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid ${(props) => props.color};
    cursor: pointer;

    &:last-of-type {
      border-bottom: 0;
    }

    .img_wrap {
      width: 100%;
      height: 300px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.4s;
      background-color: ${(props) => props.color};
    }

    dl {
      padding: 20px 10px;

      dt {
        font-size: 1.2rem;
        font-weight: 500;
        padding-bottom: 10px;
      }

      dd {
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;

        .toastui-editor-contents * {
          font-size: 1rem;
          color: inherit !important;
          margin: 0;
          padding: 0;
          border: 0;
          font-weight: 400;
          display: flex;
          background-color: transparent;
          display: inline;
          list-style: none;
          letter-spacing: 0 !important;
          font-family: "Noto Sans KR", sans-serif !important;
          ul,
          ol,
          li {
            display: none;
          }
          &::before,
          &::after {
            display: none;
          }
          img {
            display: none;
          }
          a {
            text-decoration: none;
          }
        }
      }
    }

    & > div:last-of-type {
      padding: 10px;
      padding-top: 0;
      display: flex;

      span {
        font-weight: 400;
        font-size: 0.9rem;
        padding-right: 20px;

        &:last-of-type {
          display: flex;
          align-items: center;

          svg {
            font-size: 1.2rem;
            transform: translateY(2px);
          }

          strong {
            font-weight: 500;
            padding-left: 4px;
          }
        }
      }
    }
  }

  h3 {
    font-weight: 400;
    text-align: center;
  }
`;
