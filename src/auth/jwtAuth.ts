import axios from "axios";
import api from "libs/axios";
import { palette } from "styles/theme";
import Swal from "sweetalert2";
import { setCookie } from "utils/cookie/universal-cookie";
import API_Path from "utils/path/API_Path";

const ACCESS_EXPIRY_TIME = 60000 * 5; // 5분 accessToken
const REFRESH_EXPIRY_TIME = 3600 * 1000 * 24; // 24시간 refreshToken

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

export const silentRefresh = () => {};

export const loginSuccess = (accessToken: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};
