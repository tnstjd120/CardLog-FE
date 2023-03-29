import "@emotion/react";

export type ThemeType = "light" | "dark";

declare module "@emotion/react" {
  export interface Theme {
    light: {
      backgroundColor: string;
      hoverBackgroundColor: string;
      color: string;
      hoverColor: string;
      boxShadow: string;
    };
    dark: {
      backgroundColor: string;
      hoverBackgroundColor: string;
      color: string;
      hoverColor: string;
      boxShadow: string;
    };
  }
}
