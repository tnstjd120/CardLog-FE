/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetPostResponse } from "../../types/Post";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { UserState } from "store/user";
import { homeStyles } from "styles/pages/Home";
import Button from "components/common/Button";
import { AiOutlinePlus } from "react-icons/ai";
import HomeDashedButton from "components/common/Button/HomeDashedButton";
import ToggleLamp from "components/common/lamp";
import TodayBox from "components/common/TodayBox";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import CardWrapper from "components/home/CardWrapper";

const Home = () => {
  const user = useSelector<RootState>((state) => state.user) as UserState;

  return (
    <section css={homeStyles}>
      <ToggleLamp />

      <pre>{user.about}</pre>

      <CardWrapper />

      <TodayBox />
    </section>
  );
};

export default Home;
