import React from "react";
import MobileContainer from "../../components/common/MobileContainer";
import PasswordSearchForm from "components/passwordSearch/PasswordSearchForm";

const PasswordSearch = () => {
  const caption = <>비밀번호 찾기</>;

  return (
    <MobileContainer title={"비밀번호 찾기"} caption={caption}>
      <PasswordSearchForm />
    </MobileContainer>
  );
};

export default PasswordSearch;
