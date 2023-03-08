import Home from "../../pages/Home";
import Login from "../../pages/Login";
import MyInfo from "../../pages/MyInfo";
import PostDetail from "../../pages/PostDetail";

export interface RouterItem {
  path: string;
  element: JSX.Element;
  isLoggedIn: boolean;
  label: string;
}

const RouterInfo: RouterItem[] = [
  {
    path: "/",
    element: <Home />,
    isLoggedIn: false,
    label: "홈",
  },
  {
    path: "/login",
    element: <Login />,
    isLoggedIn: false,
    label: "로그인",
  },
  {
    path: "/posts/:id",
    element: <PostDetail />,
    isLoggedIn: false,
    label: "게시물 상세페이지",
  },
  {
    path: "/my",
    element: <MyInfo />,
    isLoggedIn: true,
    label: "내 정보",
  },
];

Object.freeze(RouterInfo);

export default RouterInfo;
