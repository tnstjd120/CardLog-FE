import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponseProps } from "types/User";

export interface MyInfoState extends UserResponseProps {}

const initialState: MyInfoState = {
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
};

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    setMyInfo: (state, action: PayloadAction<MyInfoState>) => {
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
    },
  },
});

export const { setMyInfo } = myInfoSlice.actions;

export default myInfoSlice.reducer;
