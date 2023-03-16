/** @jsxImportSource @emotion/react */
import { useState, useRef, Dispatch } from "react";
import InputText from "components/common/Input/InputText";
import { SignUpInfoProps } from ".";

interface secondStepProps {
  setIsSecondStep: Dispatch<React.SetStateAction<boolean>>;
  setSignUpInfo: Dispatch<React.SetStateAction<SignUpInfoProps | null>>;
}

const SecondStep = ({ setIsSecondStep, setSignUpInfo }: secondStepProps) => {
  const userEmailRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const userPasswordRef = useRef<HTMLInputElement | null>(null);
  const userPasswordConfirmRef = useRef<HTMLInputElement | null>(null);
  const userPhoneRef = useRef<HTMLInputElement | null>(null);

  return (
    <form>
      <InputText
        type="email"
        name="email"
        placeholder="이메일"
        marginBottom="30px"
        ref={userEmailRef}
        onChange={(e) => {
          const emailExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          console.log(e.target.value, emailExp.test(e.target.value));
        }}
      />
      <InputText
        type="text"
        name="name"
        placeholder="이름"
        marginBottom="30px"
        ref={userNameRef}
      />
      <InputText
        type="password"
        name="password"
        placeholder="비밀번호"
        marginBottom="30px"
        ref={userPasswordRef}
      />
      <InputText
        type="password"
        name="passwordCheck"
        placeholder="비밀번호 확인"
        marginBottom="30px"
        ref={userPasswordConfirmRef}
      />
      <InputText
        type="text"
        name="phone"
        placeholder="핸드폰 번호"
        ref={userPhoneRef}
        maxLength={13}
        onChange={(e) => {
          e.target.value = e.target.value
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "");

          if (e.target.value.length > 12) {
            setSignUpInfo({
              email: userEmailRef.current?.value ?? "",
              name: userNameRef.current?.value ?? "",
              password: userPasswordConfirmRef.current?.value ?? "",
              phone: userPhoneRef.current?.value ?? "",
            });
          }
        }}
      />
    </form>
  );
};

export default SecondStep;
