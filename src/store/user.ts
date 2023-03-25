// get으로 받아온 유저 정보

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  profile_img: string | null;
  about: string | null;
  blog_name: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  profile_img: null,
  about: null,
  blog_name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profile_img = action.payload.profile_img;
      state.about = action.payload.about;
      state.blog_name = action.payload.blog_name;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.profile_img = null;
      state.about = null;
      state.blog_name = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
