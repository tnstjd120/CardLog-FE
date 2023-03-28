/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button, { ButtonProps } from "components/common/Button";
import HomeDashedButton from "components/common/Button/HomeDashedButton";
import { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { UserState } from "store/user";
import { cardWrapperStyles } from "styles/components/CardWrapper";
import { palette } from "styles/theme";

const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      customCss={css`
        background-color: transparent;
        font-size: 2.5em;
        color: ${palette.black4};
        transition: 0.3s;

        &:hover {
          color: ${palette.black1};
        }
      `}
      {...props}
    />
  );
};

const CardWrapper = () => {
  const navigate = useNavigate();
  const user = useSelector<RootState>((state) => state.user) as UserState;
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
    <div css={cardWrapperStyles}>
      <ul ref={CardsRef}>
        <HomeDashedButton>
          <AiOutlinePlus />
        </HomeDashedButton>

        {user.post.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              navigate(`/posts/${item.id}`);
            }}
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
        <CustomButton onClick={() => handleScrollLeft("prev")}>
          <IoMdArrowDropleft />
        </CustomButton>

        <CustomButton onClick={() => handleScrollLeft("next")}>
          <IoMdArrowDropright />
        </CustomButton>
      </div>
    </div>
  );
};

export default CardWrapper;
