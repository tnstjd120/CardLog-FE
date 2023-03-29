/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import ProfileInfo from "./ProfileInfo";
import Nav from "./Nav";
import SocialLink from "./SocialLink";

const SideBar: React.FC = (): JSX.Element => {
  return (
    <SideBarContainer>
      <ProfileInfo />

      <Nav />

      <SocialLink />
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.article`
  position: relative;
  flex-basis: 200px;
  flex-shrink: 0;
  height: 100%;
  font-size: 16px;
  font-weight: 300;
  padding: 20px 0;
  transition: 0.4s;
  background-color: inherit;
  color: inherit;

  &::after {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23999999FF' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='6' stroke-linecap='butt'/%3e%3c/svg%3e");
  }
`;
