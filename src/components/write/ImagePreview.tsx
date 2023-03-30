import styled from "@emotion/styled";
import { ImageObjProps } from "pages/Write";
import React, { SetStateAction, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { palette } from "styles/theme";

interface ImageUploadFormProps {
  imageObj: ImageObjProps | undefined;
  setImageObj: React.Dispatch<SetStateAction<ImageObjProps | undefined>>;
}
const ImageUploadForm = ({ imageObj, setImageObj }: ImageUploadFormProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageObj({ preview: reader.result as string, imageFile: file });
      };
    } else {
      setImageObj(undefined);
    }
  };

  return (
    <ImagePreviewContainer>
      <input
        type="file"
        ref={imageRef}
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
      />

      <div className="img_wrap" onClick={() => imageRef.current?.click()}>
        {imageObj ? (
          <img src={imageObj.preview} alt="Thumbnail 미리보기" />
        ) : (
          <BsImage />
        )}
      </div>
    </ImagePreviewContainer>
  );
};

export default ImageUploadForm;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  span {
    color: inherit;
  }

  input {
    display: none;
  }

  .img_wrap {
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.gray0};
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    & > svg {
      font-size: 4em;
      color: ${palette.white};
    }
  }
`;
