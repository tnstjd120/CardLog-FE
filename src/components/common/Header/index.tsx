/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import Button, { ButtonProps } from "../Button";

const headerStyles = css`
  height: 5vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    letter-spacing: 1px;
    font-weight: 300;
    span {
      text-indent: -6px;
    }
  }
`;

const CustomButton = (props: ButtonProps) => {
  return (
    <Button
      customCss={css`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      {...props}
    />
  );
};

const Header: React.FC = () => {
  return (
    <header css={headerStyles}>
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt="" />
        <span>ardLog</span>
      </div>

      <CustomButton>
        <img
          src="https://velog.velcdn.com/images/tnstjd120/profile/e1994e20-250c-4517-9c00-281ee42cd780/image.jpeg"
          alt=""
        />
      </CustomButton>
    </header>
  );
};

export default Header;
