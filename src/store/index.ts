import { configureStore } from "@reduxjs/toolkit";

import userSlice from "store/user";
import myInfoSlice from "store/myInfo";

export const store = configureStore({
  reducer: {
    user: userSlice,
    myInfo: myInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
