// get으로 받아온 유저 정보

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyInfoState {
  id: number | null;
  name: string | null;
  email: string | null;
  profileImg: string | null;
  about: string | null;
  blogName: string | null;
  access_token: string | null;
}

const initialState: MyInfoState = {
  id: null,
  name: null,
  email: null,
  profileImg: null,
  about: null,
  blogName: null,
  access_token: null,
};

const myInfoSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    setMyInfo: (state, action: PayloadAction<MyInfoState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profileImg = action.payload.profileImg;
      state.about = action.payload.about;
      state.blogName = action.payload.blogName;
      state.access_token = action.payload.access_token;
    },
    clearMyInfo: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.profileImg = null;
      state.about = null;
      state.blogName = null;
      state.access_token = null;
    },
  },
});

export const { setMyInfo, clearMyInfo } = myInfoSlice.actions;

export default myInfoSlice.reducer;
