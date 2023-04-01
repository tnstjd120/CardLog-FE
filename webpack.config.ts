const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@auth": path.resolve(__dirname, "src/auth/"),
      "@stories": path.resolve(__dirname, "src/stories/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@types": path.resolve(__dirname, "src/types/"),
      "@libs": path.resolve(__dirname, "src/libs/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
  },
};
