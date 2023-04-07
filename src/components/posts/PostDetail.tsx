/** @jsxImportSource @emotion/react */
import React, { SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import API_Path from "utils/path/API_Path";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "libs/axios";
import { PostDetailResponseProps } from "types/Post";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { keyframes, useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import { days } from "utils/date/days";
import RouterInfo from "components/routes/RouterInfo";
import Button from "components/common/Button";
import { AiOutlineClose } from "react-icons/ai";
import { palette } from "styles/theme";
import { Viewer } from "@toast-ui/react-editor";
import Loading from "components/common/Loading";
import Swal from "sweetalert2";
import { MyInfoState } from "store/myInfo";

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
  const blogId = new URLSearchParams(location.search).get("blog_id");

  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;
  const [post, setPost] = useState<PostDetailResponseProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    readPost();
  }, []);

  const readPost = async () => {
    setIsLoading(true);

    await api
      .get(`${API_Path.POSTS}${postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => console.log(error))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  };

  if (isLoading) return <Loading />;

  return (
    <PostDetailContainer color={color} backgroundColor={backgroundColor}>
      <div className="detail_header">
        <Button onClick={() => setPostId(0)}>
          <AiOutlineClose />
        </Button>

        <h3>{post?.title}</h3>
        <div className="detail_header_bottom">
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

          {blogId === myInfo.blog_id && (
            <div className="edit_buttons">
              <Button
                onClick={() => {
                  navigate(`${RouterInfo.WRITE.path}?post_id=${postId}`);
                }}
              >
                수정
              </Button>
              <Button
                onClick={() => {
                  Swal.fire({
                    icon: "warning",
                    html: `
                    <h4>정말로 삭제 하시겠습니까?</h4>
                    <small>삭제하게되면 되돌릴 수 없습니다.</small>`,
                    showCancelButton: true,
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                    confirmButtonColor: palette.black3,
                    cancelButtonColor: "#dc3545",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      const formData = new FormData();
                      formData.append("post_id", postId + "");
                      api
                        .post(API_Path.POST_DELETE, formData)
                        .then((res) => window.location.reload())
                        .catch((error) => console.log(error));
                    }
                  });
                }}
              >
                삭제
              </Button>
            </div>
          )}
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

      <Viewer initialValue={post?.content} />
    </PostDetailContainer>
  );
};

export default PostDetail;

const postDetailAnimation = keyframes`
  0% {
    height: 0;
    top: 50%;
    transform: scale(0) translateY(-50%);
  }
  100% {
    height: 100%;
    top: 0;
    transform: scale(1) translateY(0);
  }
`;

const PostDetailContainer = styled.div<emotionStyledProps>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-top: 0;
  z-index: 5;
  overflow: auto;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  animation: ${postDetailAnimation} 0.3s ease-in-out forwards;

  .detail_header {
    position: sticky;
    top: 0;
    background-color: inherit;
    color: inherit;
    padding-top: 30px;

    & > button {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 2rem;
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

    .detail_header_bottom {
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
  }

  .thumbnail {
  }

  .toastui-editor-contents {
    font-size: 1rem;

    & * {
      color: inherit;
    }
  }
`;
