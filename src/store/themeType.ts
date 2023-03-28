import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "styles/emotion";

export interface ThemeStateProps {
  themeType: ThemeType;
}

const initialState: ThemeStateProps = {
  themeType: (localStorage.getItem("themeType") as ThemeType) || "light",
};

const themeTypeSlice = createSlice({
  name: "themeType",
  initialState,
  reducers: {
    setThemeType: (state, action: PayloadAction<ThemeStateProps>) => {
      state.themeType = action.payload.themeType;
    },
  },
});

export const { setThemeType } = themeTypeSlice.actions;

export default themeTypeSlice.reducer;
