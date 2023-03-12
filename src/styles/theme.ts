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
  gray0: "#F5F5F5",
  gray1: "#DDDDDD",
  gray2: "#B5B5B5",

  yellow: "#FFEDAC",
  hoverYellow: "#FEE382",
  purple: "#D3D3F8",
  blue: "#A7D4E5",
  pink: "#FFD1DC",
};

const theme = {
  light: {
    backgroundColor: palette.white,
    color: palette.black1,
  },
  dark: {
    backgroundColor: palette.black1,
    color: palette.white,
  },
};

export default theme;
