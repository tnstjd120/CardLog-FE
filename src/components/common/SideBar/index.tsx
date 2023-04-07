/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import ProfileInfo from "./ProfileInfo";
import Nav from "./Nav";
import SocialLink from "./SocialLink";
import { RiMenuUnfoldFill } from "react-icons/ri";

const SideBar: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SideBarContainer isOpen={isOpen}>
      <ProfileInfo />

      <Nav />

      <SocialLink />

      <button onClick={() => setIsOpen(!isOpen)}>
        <RiMenuUnfoldFill />
      </button>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.article<{ isOpen: boolean }>`
  position: relative;
  flex-basis: 200px;
  flex-shrink: 0;
  max-width: 200px;
  height: 100%;
  font-size: 16px;
  font-weight: 300;
  padding: 20px 0;
  transition: 0.4s;
  background-color: inherit;
  color: inherit;
  z-index: 2;

  &::after {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='%23999999FF' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='6' stroke-linecap='butt'/%3e%3c/svg%3e");
  }

  & > button {
    position: absolute;
    top: 10px;
    right: -50px;
    font-size: 2rem;
    border: none;
    color: inherit;
    background-color: transparent;
    transition: 0.4s;
    cursor: pointer;
    display: none;
  }

  @media screen and (max-width: 1024px) {
    & {
      position: absolute;
      transform: translateX(${(props) => (props.isOpen ? 0 : "-100%")});
      & > button {
        transform: rotate(${(props) => (props.isOpen ? "180deg" : 0)});
        display: block;
      }
    }
  }
`;
