// get으로 받아온 유저 정보

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryResponseProps } from "types/Category";
import { PostResponseProps } from "types/Post";
import { UserResponseProps } from "types/User";

export interface UserState extends UserResponseProps {
  category: CategoryResponseProps[];
  post: PostResponseProps[];
}

const initialState: UserState = {
  id: 0,
  username: "",
  email: "",
  profile_img: "",
  about: "",
  phone: "",
  blog_name: "",
  blog_id: "",
  github_url: "",
  blog_url: "",
  update_at: "",
  create_at: "",
  category: [],
  post: [],
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
      state.phone = action.payload.phone;
      state.blog_id = action.payload.blog_id;
      state.blog_name = action.payload.blog_name;
      state.github_url = action.payload.github_url;
      state.blog_url = action.payload.blog_url;
      state.update_at = action.payload.update_at;
      state.create_at = action.payload.create_at;
      state.category = action.payload.category;
      state.post = action.payload.post;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
