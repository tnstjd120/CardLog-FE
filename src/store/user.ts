// get으로 받아온 유저 정보

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CategoryResponseProps,
  LinkListResponseProps,
  PostResponseProps,
  UserResponseProps,
} from "types/user/User";

export interface UserState extends UserResponseProps {
  category: CategoryResponseProps[];
  link_list: LinkListResponseProps[];
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
  update_at: "",
  create_at: "",
  category: [],
  link_list: [],
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
      state.update_at = action.payload.update_at;
      state.create_at = action.payload.create_at;
      state.category = action.payload.category;
      state.link_list = action.payload.link_list;
      state.post = action.payload.post;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
