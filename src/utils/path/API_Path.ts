const params = new URLSearchParams(window.location.search);

const blogIdQuery = `?blog_id=${params.get("blog_id")}`;

const API_Path = {
  POSTS: `posts/${blogIdQuery}`,

  // Accounts
  SIGNUP: "accounts/register/",
  LOGIN: "accounts/login/",
  LOGOUT: "accounts/logout/",
  REFRESH_TOKEN: "accounts/auth/token/refresh/",
  USER_INFO: "accounts/user/",
};

Object.freeze(API_Path);

export default API_Path;
