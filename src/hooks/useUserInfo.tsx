import axios from "axios";
import { api } from "libs/axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUser } from "store/user";
import { getCookie } from "utils/cookie/universal-cookie";
import API_Path from "utils/path/API_Path";

export const useUserInfo = async () => {
  const accessToken = getCookie("access");
  const dispatch = useDispatch();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  console.log(params.get("email"));

  // await axios
  //   .get(`${API_Path.USER_INFO}${params.get("email")}`, {
  //     baseURL: "http://localhost:8000/",
  //     withCredentials: false,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((res) => {
  //     dispatch(setUser(res.data));
  //   })
  //   .catch((error) => console.log(error));
};
