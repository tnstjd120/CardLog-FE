import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "styles/theme";
import { Provider } from "react-redux";
import { store } from "store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log("index.tsx");

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

reportWebVitals();
