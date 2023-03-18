/** @jsxImportSource @emotion/react */
import { Dispatch, useEffect, useState } from "react";
import CheckBox, { CheckBoxProps } from "components/common/CheckBox";
import { css } from "@emotion/react";
import MobileBottomButton from "components/common/Button/MobileBottomButton";
import Swal from "sweetalert2";
import { palette } from "styles/theme";

interface FirstStepProps {
  setSignUpStep: Dispatch<React.SetStateAction<number>>;
}

interface CheckListProps {
  label: string;
  checked: boolean;
  essential: boolean;
}

const FirstStep = ({ setSignUpStep }: FirstStepProps) => {
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<CheckListProps[]>([
    {
      label: "이용약관 동의(필수)",
      checked: false,
      essential: true,
    },
    {
      label: "개인정보 수집 및 이용동의 (필수)",
      checked: false,
      essential: true,
    },
    {
      label: "순성이 면접 부르기 (선택적 필수)",
      checked: false,
      essential: false,
    },
  ]);

  useEffect(() => {
    const trueCheckList = checkList.filter((item) => item.checked === true);
    setAllCheck(trueCheckList.length === checkList.length ? true : false);
  }, [checkList]);

  const handleFirstStepClick = () => {
    const essentialList = checkList.filter((item) => item.essential);
    const essentialCheckList = essentialList.filter((item) => item.checked);

    const isEssential = essentialList.length === essentialCheckList.length;

    isEssential
      ? setSignUpStep((prev) => prev + 1)
      : Swal.fire({
          icon: "error",
          text: "필수 항목을 체크해주세요.",
          confirmButtonColor: palette.black4,
          confirmButtonText: "확인",
          focusConfirm: true,
        });
  };

  const handleAllCheck = () => {
    setCheckList(
      checkList.map((item) => {
        item.checked = !allCheck;
        return item;
      })
    );

    setAllCheck(!allCheck);
  };

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
      <CustomCheckBox
        borderBottom={true}
        checked={allCheck}
        onChange={handleAllCheck}
      >
        모두 동의
      </CustomCheckBox>

      {checkList.map((item, idx) => (
        <CustomCheckBox
          key={idx}
          arrowRight={true}
          checked={item.checked}
          onChange={(e) => {
            const copiedCheckList = [...checkList];
            copiedCheckList[idx].checked = e.target.checked;

            setCheckList([...copiedCheckList]);
          }}
        >
          {item.label}
        </CustomCheckBox>
      ))}

      <MobileBottomButton onClick={handleFirstStepClick}>
        다음
      </MobileBottomButton>
    </>
  );
};

export default FirstStep;
