import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyInfoState {
  id: number | null;
  username: string | null;
  email: string | null;
  profile_img: string | null;
  about: string | null;
  blog_name: string | null;
  blog_id: string | null;
}

const initialState: MyInfoState = {
  id: null,
  username: null,
  email: null,
  profile_img: null,
  about: null,
  blog_name: null,
  blog_id: null,
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
      state.blog_id = action.payload.blog_id;
      state.blog_name = action.payload.blog_name;
    },
    clearMyInfo: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.profile_img = null;
      state.about = null;
      state.blog_name = null;
    },
  },
});

export const { setMyInfo, clearMyInfo } = myInfoSlice.actions;

export default myInfoSlice.reducer;
