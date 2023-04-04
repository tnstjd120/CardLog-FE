/** @jsxImportSource @emotion/react */
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import React, { useEffect, useRef, useState } from "react";
import InputText from "components/common/Input/InputText";
import API_Path from "utils/path/API_Path";
import Swal from "sweetalert2";
import Loading from "components/common/Loading";
import Button from "components/common/Button";
import CheckBox from "components/common/CheckBox";
import ImageUploadForm from "components/write/ImagePreview";
import styled from "@emotion/styled";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Editor } from "@toast-ui/react-editor";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import { MyInfoState } from "store/myInfo";
import { CategoryResponseProps } from "types/Category";
import { accessApi, api } from "libs/axios";
import { palette } from "styles/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { PostDetailResponseProps } from "types/Post";
import { FaArrowLeft } from "react-icons/fa";

export interface ImageObjProps {
  preview: string | undefined;
  imageFile: File | undefined;
}

const Write = () => {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["code"],
    ["scrollSync"],
  ];

  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;
  const backgroundColor = theme[themeType].backgroundColor;

  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;
  const navigate = useNavigate();
  const location = useLocation();
  const postId = new URLSearchParams(location.search).get("post_id");
  const categoryId = new URLSearchParams(location.search).get(
    "category"
  ) as string;
  const isCard = new URLSearchParams(location.search).get("isCard");

  const [imageObj, setImageObj] = useState<ImageObjProps | undefined>(
    undefined
  );
  const [post, setPost] = useState<PostDetailResponseProps | null>(null);
  const [categorys, setCategorys] = useState<CategoryResponseProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const editorRef = useRef<any>();
  const selectCategoryRef = useRef<HTMLSelectElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const cardTypeRef = useRef<HTMLInputElement | null>(null);
  const cardBgColorRef = useRef<HTMLInputElement | null>(null);
  const cardTextColorRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (postId) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("post_id", postId);

      accessApi
        .get(`${API_Path.POSTS}${postId}`)
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
          setImageObj({
            preview: `https://cardlog-bucket.s3.amazonaws.com/${res.data.thumbnail}`,
            imageFile: undefined,
          });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }

    myInfo.id &&
      api
        .get(`${API_Path.CATEGORYS}${myInfo.id}/`)
        .then((res) => {
          setCategorys(res.data);
        })
        .catch((error) => console.log(error));
  }, [myInfo]);

  const errorAlert = (text: string) => {
    Swal.fire({
      icon: "error",
      html: `
        <h4>${text}</h4>
      `,
      confirmButtonColor: palette.black4,
      confirmButtonText: "확인",
      focusConfirm: true,
    });
  };

  const validationCheck = (
    selectCategory: number,
    title: string,
    contentMarkdown: string
  ) => {
    console.log(editorRef.current);
    if (!selectCategory) {
      selectCategoryRef.current?.focus();
      errorAlert("카테고리를 선택해주세요.");
      return false;
    } else if (!title) {
      titleRef.current?.focus();
      errorAlert("제목을 작성해주세요.");
      return false;
    } else if (!contentMarkdown) {
      // editorRef.current.editorInst.mdEditor.clipboard.focus();
      errorAlert("내용을 작성해주세요.");
      return false;
    }

    return true;
  };

  const handlePostFinishClick = async () => {
    const editorInstance = editorRef.current.getInstance();

    const contentHtml = editorInstance.getHTML();
    const contentMarkdown = editorInstance.getMarkdown();
    const thumbnail = imageObj?.imageFile ?? "";
    const selectCategory = selectCategoryRef.current?.value ?? "";
    const title = titleRef.current?.value ?? "";
    const postType = cardTypeRef.current?.checked ?? "";
    const cardBgColor = cardBgColorRef.current?.value ?? "";
    const cardTextColor = cardTextColorRef.current?.value ?? "";

    // 유효성 체크
    if (!validationCheck(+selectCategory, title, contentMarkdown)) return;

    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    formData.append("category_id", selectCategory);
    formData.append("title", title);
    formData.append("content", contentMarkdown);

    if (postType) {
      formData.append("post_type", +postType + "");
      formData.append("bg_color", cardBgColor);
      formData.append("text_color", cardTextColor);
    }

    if (postId) formData.append("post_id", postId);

    await api
      .post(
        `${
          postId ? API_Path.POST_UPDATE : API_Path.POST_CREATE
        }?host_id=thumbnail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
      .finally(() => {
        navigate(-1);
        // navigate(
        //   `${RouterInfo.POST_LIST.path}?blog_id=${myInfo.blog_id}&category=${categorys[0].id}`
        // );
      });
  };

  if (isLoading) return <Loading />;

  return (
    <WriteContainer color={color} backgroundColor={backgroundColor}>
      <GoBackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </GoBackButton>

      <PostSettingHeader>
        <ImageUploadForm
          imageObj={imageObj}
          setImageObj={setImageObj}
          postId={postId}
        />

        <div className="post_setting_info">
          <InputBox>
            <select ref={selectCategoryRef} defaultValue={post?.category || 0}>
              <option value={0}>카테고리를 선택해주세요.</option>
              {categorys.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={+categoryId === category.id ? true : false}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </InputBox>

          <div>
            <InputBox>
              <span>제목</span>
              <InputText
                ref={titleRef}
                defaultValue={post?.title || ""}
                maxLength={50}
              />
            </InputBox>
          </div>

          <div>
            <CheckBox
              textLeft={true}
              ref={cardTypeRef}
              defaultChecked={isCard ? true : !!post?.post_type || false}
            >
              카드 타입
            </CheckBox>

            <InputBox>
              <span>카드 배경색</span>
              <input
                type="color"
                ref={cardBgColorRef}
                defaultValue={post?.bg_color || "#000000"}
              />
            </InputBox>

            <InputBox>
              <span>카드 글자색</span>
              <input
                type="color"
                ref={cardTextColorRef}
                defaultValue={post?.text_color || "#FFFFFF"}
              />
            </InputBox>
          </div>
        </div>
      </PostSettingHeader>
      <Editor
        initialValue={post?.content || ""}
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown" //wysiwyg, markdown
        // previewStyle={'tab'}
        useCommandShortcut={false}
        theme={themeType}
        toolbarItems={toolbarItems}
        plugins={[colorSyntax]}
        hideModeSwitch={true}
        language="ko-KR"
        ref={editorRef}
      />

      <ButtonArea>
        ​<Button onClick={() => navigate(-1)}>뒤로가기</Button>
        <Button onClick={handlePostFinishClick}>
          {postId ? "수정하기" : "글쓰기"}
        </Button>
      </ButtonArea>
    </WriteContainer>
  );
};

export default Write;

const WriteContainer = styled.section<emotionStyledProps>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - 180px);
  background-color: ${(props) => props.backgroundColor};

  .toastui-editor-dark .toastui-editor-md-container,
  .toastui-editor-dark .toastui-editor-ww-container {
    background-color: ${(props) => props.backgroundColor};
  }

  .toastui-editor-dark .toastui-editor-defaultUI-toolbar {
    background-color: ${(props) => props.backgroundColor};
    border-top: 1px solid ${(props) => props.color};
    border-bottom: 1px solid ${(props) => props.color};
  }

  .toastui-editor-dark .toastui-editor-main .toastui-editor-md-splitter {
    background-color: ${(props) => props.color};
  }

  .toastui-editor-defaultUI {
    border: none;
    /* border-bottom: 1px solid #ddd; */
  }

  .toastui-editor-defaultUI .ProseMirror,
  .toastui-editor-main
    .toastui-editor-md-vertical-style
    .toastui-editor-md-preview
    * {
    font-size: 1rem;
  }
`;

const PostSettingHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 180px;
  display: flex;
  background-color: inherit;

  & > div:first-of-type {
    flex-basis: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > .post_setting_info {
    flex: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;

    select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      color: inherit;
      background-color: transparent;
      /* outline: #ddd; */
    }

    & > div {
      display: flex;
      align-items: center;
      width: 100%;
    }

    & > div:last-of-type {
      padding: 4px 0;

      & > div {
        width: 140px;
      }

      label {
        width: 120px;
        padding: 10px;
        p {
          color: inherit;
          font-size: 1rem;
        }
      }
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 4px 10px;

  span {
    flex-basis: 90px;
    text-align: center;
  }

  label {
    color: inherit;
  }

  p {
    color: inherit !important;
  }

  input {
    width: calc(100% - 50px);
    margin-bottom: 0;
    color: inherit;
    font-size: 1rem;

    &:focus {
      border-bottom: 1px solid #ddd;
    }
  }

  input[type="color"] {
    background-color: transparent;
    border: none;
    width: 30px;
    height: 30px;

    &::-webkit-color-swatch {
      border-radius: 6px;
      border: 1px solid #ddd;
    }
  }
`;

const ButtonArea = styled.div`
  position: fixed;
  bottom: -50px;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    background-color: inherit;
    color: inherit;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 6px 12px;
    margin-left: 20px;

    &:first-of-type {
      margin-left: 0;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

const GoBackButton = styled.div`
  position: fixed;
  left: 0;
  top: -40px;
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & button {
    color: inherit;
  }
`;
