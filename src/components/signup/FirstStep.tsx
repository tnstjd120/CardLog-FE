/** @jsxImportSource @emotion/react */
import { Dispatch, useState } from "react";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import CheckBox, { CheckBoxProps } from "components/common/CheckBox";
import { css } from "@emotion/react";
import Swal from "sweetalert2";

const FirstStep = (props: {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
}) => {
  const { setSignUpStep } = props;

  const CustomCheckBox = (props: CheckBoxProps) => {
    return (
      <CheckBox
        customCss={css`
          width: 100%;
          position: relative;
        `}
        {...props}
      />
    );
  };

  return (
    <>
      <CustomCheckBox borderBottom={true}>모두 동의</CustomCheckBox>

      <CustomCheckBox arrowRight={true}>이용약관 동의(필수)</CustomCheckBox>
      <CustomCheckBox arrowRight={true}>
        개인정보 수집 및 이용동의 (필수)
      </CustomCheckBox>
      <CustomCheckBox arrowRight={true}>
        순성이 면접 부르기 (선택적 필수)
      </CustomCheckBox>
    </>
  );
};

export default FirstStep;
