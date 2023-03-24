import axios from "axios";
import api from "libs/axios";
import { palette } from "styles/theme";
import Swal from "sweetalert2";
import { getCookie } from "utils/cookie/universal-cookie";
import API_Path from "utils/path/API_Path";
import jwt_decode from "jwt-decode";
import RouterInfo from "components/routes/RouterInfo";

let loginInterval: NodeJS.Timer | null = null;

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps) => {
  await api
    .post(API_Path.LOGIN, data)
    .then((res) => loginSuccess(res.data.access_token))
    .catch((error) => {
      Swal.fire({
        icon: "error",
        text: "로그인에 실패하였습니다.",
        confirmButtonColor: palette.black4,
        confirmButtonText: "확인",
        focusConfirm: true,
      });
    });
};

export const reissueAccess = async () => {
  console.log("Access 재발급!");
  const refreshToken = getCookie("refresh");

  if (refreshToken) {
    console.log(refreshToken);
    await api
      .post(API_Path.REFRESH_TOKEN, { refresh: refreshToken })
      .then((res) => {
        loginSuccess(res.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return (window.location.href = RouterInfo.LOGIN.path);
  }
};

export const loginSuccess = (accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const decode: any = jwt_decode(accessToken);
  const expireTime = decode.exp;

  const delay = (expireTime - Date.now() / 1000) * 1000;

  loginInterval = setInterval(reissueAccess, delay - 30000);
};

export const logout = async () => {
  if (loginInterval !== null) clearInterval(loginInterval);

  await api.post(API_Path.LOGOUT);
};
