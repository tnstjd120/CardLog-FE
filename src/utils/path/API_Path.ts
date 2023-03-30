const params = new URLSearchParams(window.location.search);

const blogIdQuery = `?blog_id=${params.get("blog_id")}`;

const API_Path = {
  POST_CREATE: `api/post/create/`,
  POSTS: `api/posts/`,
  CATEGORY: `api/category/`,
  CATEGORYS: `api/categorys/`,

  // Accounts
  SIGNUP: "accounts/register/",
  LOGIN: "accounts/login/",
  LOGOUT: "accounts/logout/",
  REFRESH_TOKEN: "accounts/auth/token/refresh/",
  USER_INFO: "accounts/user/",
  PROFILE_IMAGE: "accounts/image/",
};

Object.freeze(API_Path);

export default API_Path;
