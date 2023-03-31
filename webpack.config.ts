const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 이 부분 추가
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
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
  resolveLoader: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    mainFields: ["loader", "main"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
