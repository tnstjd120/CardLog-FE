import axios from "axios";
import { accessApi, api } from "libs/axios";
import { useState, useEffect, useLayoutEffect } from "react";
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
  const blogId = params.get("blog_id");

  console.log(blogId);

  blogId
    ? await api
        .get(`${API_Path.USER_INFO}${params.get("blog_id")}/`)
        .then((res) => {
          console.log("with blogId ", res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        })
    : await accessApi
        .get(`${API_Path.USER_INFO}`)
        .then((res) => {
          console.log("unwith blogId ", res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
};
