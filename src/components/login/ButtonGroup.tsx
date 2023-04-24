/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { palette } from "styles/theme";
import Button, { ButtonProps } from "components/common/Button";
import { useNavigate } from "react-router-dom";
import RouterInfo from "components/routes/RouterInfo";
import { basicAlert } from "libs/sweetalert";

const ButtonGroup = () => {
  const navigate = useNavigate();

  const { SIGNUP, EMAIL_SEARCH } = RouterInfo;

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
      <CustomButton onClick={() => navigate(EMAIL_SEARCH.path)}>
        이메일 찾기
      </CustomButton>
      <CustomButton
        onClick={() =>
          basicAlert(`
            <h1>🥹</h1>
            <p>열심히 개발하고 있어요..!</p>
          `)
        }
      >
        비밀번호 찾기
      </CustomButton>
      <CustomButton onClick={() => navigate(SIGNUP.path)}>
        회원가입
      </CustomButton>
    </div>
  );
};

export default ButtonGroup;
