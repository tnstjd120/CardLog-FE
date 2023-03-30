/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import MobileContainer from "components/common/MobileContainer";
import { palette } from "styles/theme";
import ProfileImageForm from "components/myinfo/ProfileImageForm";
import ProfileInfoForm from "components/myinfo/ProfileInfoForm";
import Loading from "components/common/Loading";

const MyInfo = () => {
  return (
    <MobileContainer title="내 정보">
      <FormContainer>
        <ProfileImageForm />

        <ProfileInfoForm />
      </FormContainer>
    </MobileContainer>
  );
};

export default MyInfo;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding: 20px 0;
  position: relative;

  & form > button {
    margin-left: auto;
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #999;
    border-radius: 4px;

    &:hover {
      background-color: ${palette.black1};
      color: #fff;
    }
  }
`;
