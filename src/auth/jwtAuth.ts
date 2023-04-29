import { accessApi, api } from "libs/axios";
import API_Path from "utils/path/API_Path";
import jwt_decode from "jwt-decode";
import RouterInfo from "components/routes/RouterInfo";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "utils/cookie/universal-cookie";
import { errorAlert } from "libs/sweetalert";

let loginInterval: NodeJS.Timer | null = null;

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps) => {
  let statusText = "Bad Request...";

  await api
    .post(API_Path.LOGIN, data)
    .then((res) => {
      setCookie("access", res.data.access_token);
      setCookie("refresh", res.data.refresh_token);
      checkAccess();
      statusText = res.statusText;
    })
    .catch((error) => {
      statusText = error.response.statusText;

      errorAlert("로그인 실패");
    });

  return statusText;
};

export const reissueAccess = async () => {
  const refreshToken = getCookie("refresh");

  if (refreshToken) {
    await api
      .post(API_Path.REFRESH_TOKEN, { refresh: refreshToken })
      .then((res) => {
        setCookie("access", res.data.access);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (!window.location.pathname.includes(RouterInfo.LOGIN.path)) {
    const params = new URLSearchParams(window.location.search);

    if (!params.get("blog_id")) window.location.href = RouterInfo.LOGIN.path;
  }
};

export const checkAccess = () => {
  const accessToken = getCookie("access");

  // access_token 없을 때
  if (!accessToken) {
    reissueAccess();
    return;
  }

  // access_token 만료시간이 1분 남았을 때
  const decode: any = jwt_decode(accessToken);
  const expireTime = decode.exp;
  const currentTime = new Date().getTime() / 1000 - 60000; // 현재 시간 1분 전

  if (expireTime < currentTime) reissueAccess();

  const delay = (expireTime - Date.now() / 1000) * 1000;

  if (loginInterval !== null) clearInterval(loginInterval);
  loginInterval = setInterval(reissueAccess, delay - 30000);
};

export const logout = async () => {
  if (loginInterval !== null) clearInterval(loginInterval);

  await accessApi
    .post(API_Path.LOGOUT)
    .then((res) => {
      removeCookie("access");
      removeCookie("refresh");
    })
    .catch((error) => console.log(error))
    .finally(() => (window.location.href = RouterInfo.LOGIN.path));
};
