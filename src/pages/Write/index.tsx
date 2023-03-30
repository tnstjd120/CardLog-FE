/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor, Viewer } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { useTheme } from "@emotion/react";
import { emotionStyledProps } from "types/emotionStyled";
import InputText from "components/common/Input/InputText";
import Button from "components/common/Button";
import CheckBox from "components/common/CheckBox";
import ImageUploadForm from "components/write/ImagePreview";
import { MyInfoState } from "store/myInfo";
import { CategoryResponseProps } from "types/Category";
import { api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import Swal from "sweetalert2";
import { palette } from "styles/theme";

export interface ImageObjProps {
  preview: string | undefined;
  imageFile: File | undefined;
}

const Write = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;
  const backgroundColor = theme[themeType].backgroundColor;

  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;

  const [imageObj, setImageObj] = useState<ImageObjProps | undefined>(
    undefined
  );

  const [categorys, setCategorys] = useState<CategoryResponseProps[]>([]);

  useEffect(() => {
    myInfo.id &&
      api
        .get(`${API_Path.CATEGORYS}${myInfo.id}/`)
        .then((res) => {
          setCategorys(res.data);
        })
        .catch((error) => console.log(error));
  }, [myInfo]);

  const editorRef = useRef<any>();
  const selectCategoryRef = useRef<HTMLSelectElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const cardTypeRef = useRef<HTMLInputElement | null>(null);
  const cardBgColorRef = useRef<HTMLInputElement | null>(null);
  const cardTextColorRef = useRef<HTMLInputElement | null>(null);

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
    console.log(formData.get("thumbnail"));

    await api
      .post(`${API_Path.POST_CREATE}?host_id=thumbnail`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <WriteContainer color={color} backgroundColor={backgroundColor}>
      <PostSettingHeader>
        <ImageUploadForm imageObj={imageObj} setImageObj={setImageObj} />

        <div className="post_setting_info">
          <InputBox>
            <select ref={selectCategoryRef}>
              <option value={0}>카테고리를 선택해주세요.</option>
              {categorys.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </InputBox>

          <div>
            <InputBox>
              <span>제목</span>
              <InputText ref={titleRef} />
            </InputBox>
          </div>

          <div>
            <CheckBox textLeft={true} ref={cardTypeRef}>
              카드 타입
            </CheckBox>

            <InputBox>
              <span>카드 배경색</span>
              <input type="color" ref={cardBgColorRef} />
            </InputBox>

            <InputBox>
              <span>카드 글자색</span>
              <input type="color" ref={cardTextColorRef} />
            </InputBox>
          </div>
        </div>
      </PostSettingHeader>
      <Editor
        initialValue=""
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown" //wysiwyg, markdown
        // previewStyle={'tab'}
        useCommandShortcut={false}
        theme={themeType}
        plugins={[colorSyntax]}
        hideModeSwitch={true}
        language="ko-KR"
        ref={editorRef}
      />

      <ButtonArea>
        ​<Button onClick={handlePostFinishClick}>글쓰기</Button>
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
`;

const PostSettingHeader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 180px;
  display: flex;

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
  }

  input[type="color"] {
    border-radius: 50%;
    overflow: hidden;
    background-color: transparent;
    border: 0;
    width: 30px;
    height: 30px;
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

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ThumbnailBox = styled.div``;
