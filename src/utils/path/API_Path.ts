const API_Path = {
  POST_CREATE: `api/post/create/`,
  POST_UPDATE: `api/post/update/`,
  POST_DELETE: `api/post/delete/`,
  POSTS: `api/posts/`,

  CATEGORY_CREATE: `api/category/create/`,
  CATEGORY_UPDATE: `api/category/update/`,
  CATEGORY_DELETE: `api/category/delete/`,
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
