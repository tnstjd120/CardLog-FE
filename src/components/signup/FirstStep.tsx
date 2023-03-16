/** @jsxImportSource @emotion/react */
import { Dispatch, useEffect, useState } from "react";
import CheckBox, { CheckBoxProps } from "components/common/CheckBox";
import { css } from "@emotion/react";

interface CheckListProps {
  label: string;
  checked: boolean;
  essential: boolean;
}

const FirstStep = (props: {
  setIsFirstStep: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setIsFirstStep } = props;

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

    isEssentialCheck();
  }, [checkList]);

  const isEssentialCheck = () => {
    const essentialList = checkList.filter((item) => item.essential);
    const essentialCheckList = essentialList.filter((item) => item.checked);

    setIsFirstStep(essentialList.length === essentialCheckList.length);
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
    </>
  );
};

export default FirstStep;
