/** @jsxImportSource @emotion/react */
import { Dispatch } from "react";
import { SignUpInfoProps } from ".";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import ValidInputText from "components/common/Input/ValidInputText";
import validObj from "./validObj";
import Swal from "sweetalert2";
import { palette } from "styles/theme";
import { UserInfoStepStyles } from "styles/components/signup";

interface UserInfoStepProps {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
  setSignUpInfo: Dispatch<React.SetStateAction<SignUpInfoProps | null>>;
}

const UserInfoStep = ({ setSignUpStep, setSignUpInfo }: UserInfoStepProps) => {
  const handleUserInfoStepClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    for (let [key, item] of Object.entries(validObj)) {
      if (!item.isTest) {
        return Swal.fire({
          icon: "warning",
          text: "각 항목 형식에 맞게 작성해주세요.",
          confirmButtonColor: palette.black4,
          confirmButtonText: "확인",
          focusConfirm: true,
        });
      }
    }

    setSignUpInfo({
      email: validObj.email.value,
      username: validObj.username.value,
      password1: validObj.password.value,
      password2: validObj.passwordConfirm.value,
      phone: validObj.phone.value,
      blog_id: validObj.blog_id.value,
    });

    setSignUpStep((prev) => prev + 1);
  };

  return (
    <form css={UserInfoStepStyles}>
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
        type="password"
        name="password"
        placeholder="비밀번호"
        validType="password"
        validTooltip="비밀번호 형식에 적합합니다."
        invalidTooltip="비밀번호는 최소 8자리 숫자,문자,특수문자 최소 1개를 포함해서 작성해주세요."
        validObj={validObj}
      />

      <ValidInputText
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        validType="passwordConfirm"
        validTooltip="비밀번호가 일치합니다."
        invalidTooltip="비밀번호가 일치하지 않습니다."
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

      <MobileBottomButton onClick={(e) => handleUserInfoStepClick(e)}>
        다음
      </MobileBottomButton>
    </form>
  );
};

export default UserInfoStep;
