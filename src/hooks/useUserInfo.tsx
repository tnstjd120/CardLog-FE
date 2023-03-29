import RouterInfo from "components/routes/RouterInfo";
import API_Path from "utils/path/API_Path";
import { accessApi, api } from "libs/axios";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setMyInfo } from "store/myInfo";
import { setUser } from "store/user";
import { getCookie } from "utils/cookie/universal-cookie";

export const useUserInfo = async () => {
  const dispatch = useDispatch();
  const refreshToken = getCookie("refresh");

  const { search, pathname } = useLocation();
  const params = new URLSearchParams(search);
  const blogId = params.get("blog_id");

  const pathTypeCheck = async () => {
    const notAccessPath: string[] = ["/", "/login", "/signup"];

    !notAccessPath.includes(pathname)
      ? await accessApi
          .get(`${API_Path.USER_INFO}`)
          .then((res) => {
            console.log("myinfo => ", res.data);
            dispatch(setMyInfo(res.data));
          })
          .catch((error) => console.log(error))
      : pathname === "/" && (window.location.href = RouterInfo.Intro.path);
  };

  const GlobalUserStateSet = async () => {
    await api
      .get(`${API_Path.USER_INFO}${params.get("blog_id")}/`)
      .then((res) => dispatch(setUser(res.data)))
      .catch((error) => console.log(error));

    refreshToken &&
      (await accessApi
        .get(`${API_Path.USER_INFO}`)
        .then((res) => dispatch(setMyInfo(res.data)))
        .catch((error) => console.log(error)));
  };

  blogId ? GlobalUserStateSet() : pathTypeCheck();
};
