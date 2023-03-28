export const palette = {
  // White
  white: "#FFFFFF",

  // Black
  black0: "#000000",
  black1: "#333333",
  black2: "#555555",
  black3: "#777777",
  black4: "#999999",

  // Gray
  gray0: "#B5B5B5",
  gray1: "#DDDDDD",
  gray2: "#F5F5F5",

  yellow: "#FFEDAC",
  hoverYellow: "#FEE382",
  purple: "#D3D3F8",
  blue: "#A7D4E5",
  pink: "#FFD1DC",

  success: "#28a745",
  danger: "#dc3545",
};

const theme = {
  light: {
    backgroundColor: palette.white,
    hoverBackgroundColor: palette.gray2,
    color: palette.black3,
    hoverColor: palette.black1,
  },
  dark: {
    backgroundColor: palette.black1,
    hoverBackgroundColor: palette.black3,
    color: palette.white,
    hoverColor: palette.gray2,
  },
};

export default theme;
