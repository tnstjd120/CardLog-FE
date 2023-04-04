/** @jsxImportSource @emotion/react */
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import API_Path from "utils/path/API_Path";
import { loginFormStyle } from "styles/components/login";
import { api } from "libs/axios";
import { useState } from "react";
import Loading from "../common/Loading";
import ValidInputText from "../common/Input/ValidInputText";
import validObj from "../signup/validObj";
import styled from "@emotion/styled";
import Button from "../common/Button";
import Swal from "sweetalert2";
import { palette } from "styles/theme";
import { useNavigate } from "react-router-dom";
import RouterInfo from "../routes/RouterInfo";

const PasswordSearchForm = () => {
  const navigate = useNavigate();

  const [searchEmail, setSearchEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 클라이언트에서 유효성 검증
    for (let [key, item] of Object.entries(validObj)) {
      if (["username", "phone"].includes(key) && !item.isTest) {
        return Swal.fire({
          icon: "warning",
          text: "각 항목 형식에 맞게 작성해주세요.",
          confirmButtonColor: palette.black4,
          confirmButtonText: "확인",
          focusConfirm: true,
        });
      }
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    await api
      .post(API_Path.EMAIL_SEARCH, formData)
      .then((res) => {
        setSearchEmail(res.data.email);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "이메일 찾기에 실패했습니다.",
          confirmButtonColor: palette.black4,
          confirmButtonText: "확인",
          focusConfirm: true,
        });
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 0)
      );
  };

  return (
    <>
      {isLoading && <Loading />}

      {searchEmail ? (
        <PasswordSearchContainer>
          <h3>새로운 비밀번호를 입력해주세요</h3>

          <div>
            <Button onClick={() => navigate(RouterInfo.LOGIN.path)}>
              로그인 하기
            </Button>
            <Button>비밀번호 찾기</Button>
          </div>
        </PasswordSearchContainer>
      ) : (
        <form css={loginFormStyle} onSubmit={handleSubmit}>
          <ValidInputText
            type="email"
            name="email"
            placeholder="이메일"
            validType="email"
            validTooltip="이메일 형식에 적합합니다."
            invalidTooltip="이메일 형식에 적합하지 않습니다."
            validObj={validObj}
          />

          <ValidInputText
            type="text"
            name="blog_id"
            placeholder="블로그 고유 아이디 ex) cardlog.com/blog_id123"
            validType="blog_id"
            validTooltip="아이디 형식에 적합합니다."
            invalidTooltip="블로그 아이디는 최소 6자리, 영문자로 시작하고 영문자 또는 숫자로 작성해주세요."
            validObj={validObj}
          />

          <ValidInputText
            type="text"
            name="username"
            placeholder="이름"
            validType="username"
            validTooltip="이름 형식에 적합합니다."
            invalidTooltip="이름은 한글 2~5 글자로 작성해주세요."
            validObj={validObj}
          />

          <ValidInputText
            type="text"
            name="phone"
            placeholder="휴대폰 번호"
            validType="phone"
            validTooltip="휴대폰 번호 형식에 적합합니다."
            invalidTooltip="휴대폰 번호 형식에 적합하지 않습니다."
            validObj={validObj}
          />

          <MobileBottomButton type="submit">다음</MobileBottomButton>
        </form>
      )}
    </>
  );
};

export default PasswordSearchForm;

const PasswordSearchContainer = styled.div`
  h3 {
    margin-bottom: 30px;
    text-align: center;
    font-weight: 400;
  }

  p {
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: 50px;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
      color: inherit;

      &::after {
        content: "|";
        padding: 0 12px 2px;
      }

      &:last-of-type::after {
        content: "";
        padding: 0;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;