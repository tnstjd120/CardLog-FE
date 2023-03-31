/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Button from "components/common/Button";
import { css, useTheme } from "@emotion/react";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { UserState } from "store/user";
import { palette } from "styles/theme";
import { emotionStyledProps } from "types/emotionStyled";
import RouterInfo from "components/routes/RouterInfo";
import PostDetail from "components/posts/PostDetail";

const CardWrapper = () => {
  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;

  const theme = useTheme();
  const color = theme[themeType].color;

  const navigate = useNavigate();
  const user = useSelector<RootState>((state) => state.user) as UserState;
  const [postId, setPostId] = useState<number>(0);
  const CardsRef = useRef<HTMLUListElement>(null);

  const handleScrollLeft = (type: string) => {
    if (CardsRef.current) {
      const cardWidth = CardsRef.current.querySelector("li")?.offsetWidth;

      CardsRef.current.scrollBy({
        left: type === "prev" ? parseInt(`-${cardWidth}`) : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <CardWrapperContainer color={color}>
      <ul ref={CardsRef}>
        <button type="button" onClick={() => navigate(RouterInfo.WRITE.path)}>
          <AiOutlinePlus />
        </button>

        {user.post.map((item) => (
          <li
            key={item.id}
            onClick={() => setPostId(item.id)}
            css={css`
              background-color: ${item.bg_color};
              color: ${item.text_color};
            `}
          >
            <h3>{item.title}</h3>
          </li>
        ))}
      </ul>

      <div className="controller">
        <Button onClick={() => handleScrollLeft("prev")}>
          <IoMdArrowDropleft />
        </Button>

        <Button onClick={() => handleScrollLeft("next")}>
          <IoMdArrowDropright />
        </Button>
      </div>

      {!!postId && <PostDetail postId={postId} setPostId={setPostId} />}
    </CardWrapperContainer>
  );
};

export default CardWrapper;

const CardWrapperContainer = styled.div<emotionStyledProps>`
  position: relative;
  margin-top: 130px;
  margin-left: 30px;
  transition: 0.4s;

  & > ul {
    padding: 30px 0;
    padding-right: 40px;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    min-height: 460px;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      width: 30%;
      background-color: ${(props) => props.color};
      border-radius: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${(props) => props.color}30;
    }

    & > button[type="button"] {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23999999FF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='27' stroke-linecap='round'/%3e%3c/svg%3e");
      border: none;
      border-radius: 5px;
      min-width: 70px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      position: sticky;
      left: 0;
      top: 30px;
      color: inherit;
      cursor: pointer;
      transition: 0.4s;

      &:hover {
        background-color: ${(props) => props.color}20;
      }
    }

    li {
      box-shadow: 2px 10px 18px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 50px;
      min-width: 280px;
      height: 400px;
      padding: 10px;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        transform: translateY(-5%);
        box-shadow: 2px 10px 18px 4px rgba(0, 0, 0, 0.2);
      }

      h3 {
        font-size: 1em;
        font-weight: 500;
      }
    }
  }

  & > .controller {
    display: flex;
    position: absolute;
    right: 20px;
    bottom: -60px;

    button {
      background-color: transparent;
      color: inherit;
      font-size: 2.5em;
      color: ${palette.black4};
      transition: 0.4s;

      &:hover {
        color: ${palette.black1};
      }
    }
  }
`;
