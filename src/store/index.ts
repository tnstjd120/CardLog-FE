import { configureStore } from "@reduxjs/toolkit";

import userReducer from "store/user";
import myInfoReducer from "store/myInfo";

export const store = configureStore({
  reducer: {
    user: userReducer,
    myInfo: myInfoReducer,
  },
});
