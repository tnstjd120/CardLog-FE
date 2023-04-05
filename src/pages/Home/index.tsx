/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import Lamp from "components/common/Lamp";
import TodayBox from "components/common/TodayBox";
import CardWrapper from "components/home/CardWrapper";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";

const Home = () => {
  const user = useSelector<RootState>((state) => state.user) as UserState;

  return (
    <HomeContainer>
      <HomeTopArea>
        <div>
          <pre>{user.about}</pre>
        </div>

        <div>
          <Lamp />
        </div>
      </HomeTopArea>

      <CardWrapper />

      {/* <TodayBox /> */}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  background-color: inherit;
  color: inherit;
`;

const HomeTopArea = styled.div`
  display: flex;

  & > div {
    width: 50%;
    height: 280px;
    position: relative;
  }

  & > div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 20px;
  }

  pre {
    line-height: 1.5;
    font-size: 1em;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    & {
      flex-direction: column-reverse;
      align-items: center;

      & > div {
        width: 100%;
      }
    }
  }
`;
