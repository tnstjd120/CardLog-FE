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
import { useNavigate } from "react-router-dom";
import RouterInfo from "../routes/RouterInfo";
import { errorAlert, warningAlert } from "libs/sweetalert";

const EmailSearchForm = () => {
  const navigate = useNavigate();

  const [searchEmail, setSearchEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIdSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 클라이언트에서 유효성 검증
    for (let [key, item] of Object.entries(validObj)) {
      if (["username", "phone"].includes(key) && !item.isTest) {
        return warningAlert("각 항목 형식에 맞게 작성해주세요.");
      }
    }

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    await api
      .post(API_Path.EMAIL_SEARCH, formData)
      .then((res) => {
        setSearchEmail(res.data.email);
      })
      .catch((error) => errorAlert("이메일 찾기에 실패했습니다."))
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
        <SearchEmailContainer>
          <h3>회원님의 이메일</h3>

          <p>"{searchEmail}"</p>

          <div>
            <Button onClick={() => navigate(RouterInfo.LOGIN.path)}>
              로그인 하기
            </Button>
            <Button>비밀번호 찾기</Button>
          </div>
        </SearchEmailContainer>
      ) : (
        <form css={loginFormStyle} onSubmit={handleIdSearchSubmit}>
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

export default EmailSearchForm;

const SearchEmailContainer = styled.div`
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
