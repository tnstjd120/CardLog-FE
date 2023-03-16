/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import Button, { ButtonProps } from "components/common/Button";
import { useNavigate } from "react-router-dom";
import RouterInfo from "components/routes/RouterInfo";

const ButtonGroup = () => {
  const navigate = useNavigate();

  const { SIGNUP } = RouterInfo;

  const CustomButton = (props: ButtonProps) => {
    return (
      <Button
        customCss={css`
          color: ${palette.black3};
          &:hover {
            text-decoration: underline;
          }
        `}
        type="button"
        {...props}
      />
    );
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;

        & > button:not(:last-child)::after {
          content: "|";
          padding: 0 12px 3px;
          color: ${palette.gray2};
        }
      `}
    >
      <CustomButton>아이디 찾기</CustomButton>
      <CustomButton>비밀번호 찾기</CustomButton>
      <CustomButton onClick={() => navigate(SIGNUP.path)}>
        회원가입
      </CustomButton>
    </div>
  );
};

export default ButtonGroup;
