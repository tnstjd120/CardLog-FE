import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import RouterInfo from "components/routes/RouterInfo";
import { accessApi } from "libs/axios";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "store";
import { MyInfoState } from "store/myInfo";
import { ThemeStateProps } from "store/themeType";
import { palette } from "styles/theme";
import API_Path from "utils/path/API_Path";

const AddCategory = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;

  const navigate = useNavigate();
  const location = useLocation();

  const myInfo = useSelector<RootState>((state) => state.myInfo) as MyInfoState;
  const [isAddCategory, setIsAddCategory] = useState<boolean>(false);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  const handleAddCategoryBlur = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.currentTarget.value && CreateCategory();
    setIsAddCategory(false);
  };

  const handleAddCategoryClick = () => {
    setIsAddCategory(true);
    setTimeout(() => {
      categoryRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleAddCategoryBlur(e);
  };

  const CreateCategory = () => {
    const formData = new FormData();
    formData.append("user_id", myInfo.id + "");
    formData.append("name", categoryRef.current?.value ?? "");
    accessApi
      .post(API_Path.CATEGORY_CREATE, formData)
      .then((res) => {
        setIsAddCategory(false);
        navigate(`${location.pathname}${location.search}`);
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  };

  return (
    <AddCategoryContaier color={color}>
      {isAddCategory ? (
        <input
          type="text"
          ref={categoryRef}
          onBlur={(e) => handleAddCategoryBlur(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          maxLength={12}
        />
      ) : (
        <button type="button" onClick={handleAddCategoryClick}>
          <AiOutlinePlus />
        </button>
      )}
    </AddCategoryContaier>
  );
};

export default AddCategory;

const AddCategoryContaier = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 2px solid ${(props) => props.color};
  }

  & > button[type="button"] {
    /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23999999FF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='27' stroke-linecap='round'/%3e%3c/svg%3e"); */
    border: none;
    border-bottom: 1px solid #ddd;
    height: 42px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    transition: 0.4s;

    &:hover {
      background-color: ${(props) => props.color}10;
    }
  }
`;
