import React from "react";
import MobileContainer from "../../components/common/MobileContainer";
import EmailSearchForm from "components/emailSearch/EmailSearchForm";

const EmailSearch = () => {
  const caption = <>아이디 찾기</>;

  return (
    <MobileContainer title={"아이디 찾기"} caption={caption}>
      <EmailSearchForm />
    </MobileContainer>
  );
};

export default EmailSearch;
