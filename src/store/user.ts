// get으로 받아온 유저 정보

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  profileImg: string | null;
  about: string | null;
  blogName: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  profileImg: null,
  about: null,
  blogName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profileImg = action.payload.profileImg;
      state.about = action.payload.about;
      state.blogName = action.payload.blogName;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.profileImg = null;
      state.about = null;
      state.blogName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
