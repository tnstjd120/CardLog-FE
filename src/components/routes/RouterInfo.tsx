import Home from "../../pages/Home";
import Login from "../../pages/Login";
import MyInfo from "../../pages/MyInfo";
import PostDetail from "../../pages/PostDetail";

export interface RouterItem {
  path: string;
  element: JSX.Element;
  isLoggedIn: boolean;
  isWithNav: boolean;
  isNavIn: boolean;
  label: string;
}

type RouterItemType = {
  [key: string]: RouterItem;
};

const RouterInfo: RouterItemType = {
  HOME: {
    path: "/",
    element: <Home />,
    label: "홈",
    isLoggedIn: false, // 로그인이 필요한 페이지인지
    isWithNav: true, // Nav와 함께 나올 페이지인지
    isNavIn: true, // Nav안에 보여줄 페이지인지
  },
  LOGIN: {
    path: "/login",
    element: <Login />,
    label: "로그인",
    isLoggedIn: false,
    isWithNav: false,
    isNavIn: true,
  },
  POST: {
    path: "/posts/:id",
    element: <PostDetail />,
    label: "게시물 상세페이지",
    isLoggedIn: false,
    isWithNav: true,
    isNavIn: true,
  },
  MYINFO: {
    path: "/my",
    element: <MyInfo />,
    label: "내 정보",
    isLoggedIn: true,
    isWithNav: false,
    isNavIn: true,
  },
};

Object.freeze(RouterInfo);

export default RouterInfo;
