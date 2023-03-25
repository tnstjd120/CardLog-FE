import axios from "axios";
import { api } from "libs/axios";
import Swal from "sweetalert2";
import API_Path from "utils/path/API_Path";
import jwt_decode from "jwt-decode";
import RouterInfo from "components/routes/RouterInfo";
import { palette } from "styles/theme";
import { getCookie } from "utils/cookie/universal-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "store/user";

let loginInterval: NodeJS.Timer | null = null;

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps) => {
  await api
    .post(API_Path.LOGIN, data)
    .then((res) => {
      checkAccess();
    })
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
  const refreshToken = getCookie("refresh");
  console.log("reissueAccess!");
  if (refreshToken) {
    await api
      .post(API_Path.REFRESH_TOKEN, { refresh: refreshToken })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return (window.location.href = RouterInfo.LOGIN.path);
  }
};

export const checkAccess = () => {
  console.log("AccessToken Check!");
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

// export const loginSuccess = (accessToken: string) => {
//   // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//   const decode: any = jwt_decode(accessToken);
//   const expireTime = decode.exp;

//   const delay = (expireTime - Date.now() / 1000) * 1000;

// };

export const logout = async () => {
  if (loginInterval !== null) clearInterval(loginInterval);

  await api.post(API_Path.LOGOUT);
};
