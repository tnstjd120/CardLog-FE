type LoginSuccessMessage = "SUCCESS";
type loginFailMessage = "FAIL";

export interface UserResponse {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: LoginSuccessMessage | loginFailMessage;
  token: string;
  userInfo: UserResponse;
}
