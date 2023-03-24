import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface accessTokenProps {
  token: string | null;
}

const initialState: accessTokenProps = {
  token: null,
};

const accessTokenSlice = createSlice({
  name: "myInfo",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<accessTokenProps>) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
