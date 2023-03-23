export interface UserResponse {
  id: number;
  email: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}
