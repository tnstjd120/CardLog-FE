import { errorAlert } from "libs/sweetalert";
import axios from "axios";
import { api } from "libs/axios";
import { setCookie } from "utils/cookie/universal-cookie";
import API_Path from "utils/path/API_Path";

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps) => {
  await api
    .post(API_Path.LOGIN, data)
    .then((res) => {
      setCookie("refresh_token", res.data.refresh_token, {
        sameSite: "strict",
      });

      loginSuccess(res.data.access_token);
    })
    .catch((error) => {
      errorAlert(`
      <h4>로그인에 실패하였습니다.</h4>
      <p>${error}</p>
    `);
    });
};

export const silentRefresh = () => {};

export const loginSuccess = (accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};
