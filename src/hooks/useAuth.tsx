import api from "libs/axios";
import { useEffect, useState, useLayoutEffect } from "react";
import { getCookie } from "utils/cookie/universal-cookie";
import API_Path from "utils/path/API_Path";

export const useAuth = async () => {
  const accessToken = getCookie("access");
  console.log(accessToken);

  if (accessToken) {
    return true;
  } else {
    return await reissueAccess();
  }
};
// FIXME Promise 객체 고쳐야됌
const reissueAccess = async () => {
  console.log("0 refresh");
  const refreshToken = getCookie("refresh");
  if (refreshToken) {
    console.log(refreshToken);
    await api
      .post(API_Path.REFRESH_TOKEN, { refresh: refreshToken })
      .then((res) => {
        console.log("1 refresh");
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } else {
    console.log("2 refresh");
    return false;
  }
};
