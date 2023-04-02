/** @jsxImportSource @emotion/react */
import RouterInfo from "components/routes/RouterInfo";
import Button, { ButtonProps } from "../Button";
import { css, useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { ThemeStateProps } from "store/themeType";
import { logout } from "auth/jwtAuth";
import { IoMdArrowDropdown } from "react-icons/io";

interface MenuListProps {
  value: string | Promise<void>;
  label: string;
}

const HeaderDropDownButton = (props: ButtonProps) => {
  const blogId = useSelector<RootState>((state) => state.myInfo.blog_id);
  const menuList: MenuListProps[] = [
    {
      value: `${RouterInfo.HOME.path}?blog_id=${blogId}`,
      label: "내 카드로그",
    },
    { value: RouterInfo.MYINFO.path, label: "내 정보" },
    { value: RouterInfo.WRITE.path, label: "글쓰기" },
    { value: "", label: "로그아웃" },
  ];

  const { themeType } = useSelector<RootState>(
    (state) => state.themeType
  ) as ThemeStateProps;
  const theme = useTheme();

  const navigate = useNavigate();

  const [isDropDown, setIsDropDown] = useState<Boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsDropDown(false);
    }
  };

  useEffect(() => {
    isDropDown
      ? document.addEventListener("mousedown", handleClickOutSide)
      : document.removeEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [isDropDown]);

  const toggleMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
      },
      display: "flex",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const profileButtonStyles = css`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    & > svg {
      font-size: 1.5rem;
      padding-left: 4px;
    }
  `;

  const buttonStyles = css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  `;

  const motionUlStyles = css`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    right: 1px;
    top: calc(100% + 11px);
    width: 120px;
    background-color: ${theme[themeType].backgroundColor};
    color: ${theme[themeType].color};
    /* border: 1px solid #ddd; */
    box-shadow: ${theme[themeType].boxShadow};
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 300;

    li {
      padding: 8px 16px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;

      &:last-of-type {
        border-bottom: 0;
      }

      &:hover {
        background-color: ${theme[themeType].hoverBackgroundColor};
        color: ${theme[themeType].hoverColor};
      }
    }
  `;

  return (
    <div
      css={profileButtonStyles}
      ref={modalRef}
      onClick={() => setIsDropDown(!isDropDown)}
    >
      <Button customCss={buttonStyles} {...props} />

      <motion.ul
        css={motionUlStyles}
        initial="exit"
        animate={isDropDown ? "enter" : "exit"}
        variants={toggleMenuAnimate}
      >
        {menuList.map((menu, idx) => (
          <li
            key={idx}
            onClick={(e: React.MouseEvent<HTMLLIElement>) => {
              e.currentTarget.innerText !== "로그아웃"
                ? navigate(menu.value as string)
                : logout();
            }}
          >
            {menu.label}
          </li>
        ))}
      </motion.ul>

      <IoMdArrowDropdown />
    </div>
  );
};

export default HeaderDropDownButton;
