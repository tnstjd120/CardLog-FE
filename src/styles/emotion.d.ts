import "@emotion/react";

export type ThemeType = "light" | "dark";

declare module "@emotion/react" {
  export interface Theme {
    [key in ThemeType]: {
      backgroundColor: string;
      // hoverBackgroundColor: string;
      color: string;
      // hoverColor: string;
    };
  }
}
