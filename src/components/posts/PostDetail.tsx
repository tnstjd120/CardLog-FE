/** @jsxImportSource @emotion/react */
import React, { SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import API_Path from "utils/path/API_Path";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "libs/axios";
import { PostDetailResponseProps, PostResponseProps } from "types/Post";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import { days } from "utils/date/days";
import { BiComment } from "react-icons/bi";
import RouterInfo from "components/routes/RouterInfo";
import Button from "components/common/Button";
import { AiOutlineClose } from "react-icons/ai";
import { palette } from "styles/theme";

interface PostDetailProps {
  postId: string | number;
  setPostId: React.Dispatch<SetStateAction<number>>;
}

const PostDetail = ({ postId, setPostId }: PostDetailProps) => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;
  const backgroundColor = theme[themeType].backgroundColor;

  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get(
    "category"
  ) as string;

  const [post, setPost] = useState<PostDetailResponseProps | null>(null);

  useEffect(() => {
    readPost();
  }, []);

  const readPost = () => {
    api
      .get(`${API_Path.POSTS}${postId}`)
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <PostDetailContainer color={color} backgroundColor={backgroundColor}>
      <Button onClick={() => setPostId(0)}>
        <AiOutlineClose />
      </Button>

      <h3>{post?.title}</h3>

      <div className="detail_header">
        <div className="post_info">
          {post?.user.profile_img && (
            <div className="img_wrap">
              <img
                src={`https://cardlog-bucket.s3.amazonaws.com/${post.user.profile_img}`}
                alt="post_thumbnail"
              />
            </div>
          )}

          <div className="text_wrap">
            <strong>{post?.user.email}</strong>
            <span>{days(post?.create_at ?? "")}</span>
          </div>
        </div>

        <div className="edit_buttons">
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </div>

      {post?.thumbnail && (
        <div className="thumbnail">
          <img
            src={`https://cardlog-bucket.s3.amazonaws.com/${post.thumbnail}`}
            alt="post_thumbnail"
          />
        </div>
      )}

      <pre>{post?.content}</pre>
    </PostDetailContainer>
  );
};

export default PostDetail;

const PostDetailContainer = styled.div<emotionStyledProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-top: 50px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  & > button {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    background-color: transparent;

    &:hover {
      background-color: ${palette.gray2};
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .detail_header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => props.color};

    .post_info {
      display: flex;

      .img_wrap {
        width: 46px;
        height: 46px;
        overflow: hidden;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .text_wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 10px;
      }
    }

    .edit_buttons {
      display: flex;

      button {
        background-color: transparent;
        padding: 4px 8px;
        color: inherit;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .thumbnail {
  }

  pre {
    width: 100%;
    white-space: pre-wrap;
    font-size: 1rem;
    line-height: 1.4;
    padding: 20px 0;
  }
`;
