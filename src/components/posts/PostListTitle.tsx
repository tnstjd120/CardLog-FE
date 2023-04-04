/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { emotionStyledProps } from "types/emotionStyled";
import { accessApi, api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import { useLocation, useNavigate } from "react-router-dom";
import RouterInfo from "components/routes/RouterInfo";
import Swal from "sweetalert2";
import { palette } from "styles/theme";
import { MyInfoState } from "store/myInfo";
import Loading from "../common/Loading";

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
  const location = useLocation();
  const blogId = new URLSearchParams(location.search).get("blog_id");

  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [isAddCategory, setIsAddCategory] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categoryRef = useRef<HTMLInputElement | null>(null);

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

  const handleDeleteCategory = () => {
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
        formData.append("category_id", categoryId + "");

        accessApi
          .post(API_Path.CATEGORY_DELETE, formData)
          .then((res) => {
            if (res.data.message !== "success") {
              Swal.fire({
                icon: "warning",
                html: `
                <h4>${res.data.message}</h4>
                `,
                confirmButtonText: "확인",
                confirmButtonColor: palette.black3,
              });

              return;
            }

            navigate(`${RouterInfo.HOME.path}?blog_id=${blogId}`);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleUpdateCategory = () => {
    setIsLoading(true);
    if (!categoryRef.current?.value) {
      Swal.fire({
        icon: "warning",
        html: `
        <h4>카테고리 이름을 채워주세요.</h4>
        `,
        confirmButtonText: "확인",
        confirmButtonColor: palette.black3,
      }).then((result) => {
        if (result.isConfirmed) {
          return setTimeout(() => {
            categoryRef.current?.focus();
          }, 0);
        }
      });
      return;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId + "");
    formData.append("name", categoryRef.current?.value as string);

    accessApi
      .post(API_Path.CATEGORY_UPDATE, formData)
      .then((res) => {
        setIsAddCategory(false);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        navigate(`${RouterInfo.POST_LIST.path}/${location.search}`);
        readCategoryName();
        setIsLoading(false);
      });
  };

  const handleUpdateOpen = () => {
    setIsAddCategory(true);
    setTimeout(() => {
      categoryRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateCategory();
    }
  };

  if (isLoading) return <Loading />;
  return (
    <PostsTitle color={color} backgroundColor={backgroundColor}>
      {isAddCategory ? (
        <>
          <h2>
            <input
              type="text"
              ref={categoryRef}
              defaultValue={categoryName as string}
              onKeyDown={(e) => handleKeyDown(e)}
              onBlur={handleUpdateCategory}
              maxLength={12}
            />
          </h2>
          <button onClick={handleUpdateCategory}>수정하기</button>
        </>
      ) : (
        <>
          <h2>
            {categoryName} <span>({postsLength})</span>
          </h2>

          {blogId === myInfo.blog_id && (
            <div>
              <button
                onClick={() =>
                  navigate(`${RouterInfo.WRITE.path}/?category=${categoryId}`)
                }
              >
                글쓰기
              </button>
              <button onClick={handleUpdateOpen}>수정</button>
              <button onClick={handleDeleteCategory}>삭제</button>
            </div>
          )}
        </>
      )}
    </PostsTitle>
  );
};

export default PostListTitle;

const PostsTitle = styled.div<emotionStyledProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
    input {
      font-size: 1.2rem;
      font-weight: 500;
      padding: 5px 8px;
      color: inherit;
      border: 1px solid ${(props) => props.color};
      border-radius: 4px;
    }
  }

  & > div {
    display: flex;
    align-items: center;
  }

  button {
    color: inherit;
    background-color: transparent;
    border: none;
    font-size: 0.9rem;
    margin-left: 8px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
