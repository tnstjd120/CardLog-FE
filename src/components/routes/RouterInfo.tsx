import SignUp from "pages/SignUp";
import SignUpSuccess from "pages/SignUpSuccess";
import Home from "pages/Home";
import Login from "pages/Login";
import MyInfo from "pages/MyInfo";
import PostDetail from "pages/PostDetail";
import Intro from "pages/Intro";
import Posts from "pages/Posts";
import Write from "pages/Write";

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
  Intro: {
    path: "/intro",
    element: <Intro />,
    label: "인트로",
    isLoggedIn: false,
    isWithNav: false,
    isNavIn: false,
  },
  LOGIN: {
    path: "/login",
    element: <Login />,
    label: "로그인",
    isLoggedIn: false,
    isWithNav: false,
    isNavIn: true,
  },
  SIGNUP: {
    path: "/signup",
    element: <SignUp />,
    label: "회원가입",
    isLoggedIn: false,
    isWithNav: false,
    isNavIn: true,
  },
  SIGNUP_SUCCESS: {
    path: "/signup/success",
    element: <SignUpSuccess />,
    label: "회원가입 성공",
    isLoggedIn: false,
    isWithNav: false,
    isNavIn: false,
  },
  POST_LIST: {
    path: "/posts",
    element: <Posts />,
    label: "게시물 리스트",
    isLoggedIn: false,
    isWithNav: true,
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
  WRITE: {
    path: "/write",
    element: <Write />,
    label: "글쓰기",
    isLoggedIn: true,
    isWithNav: false,
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
