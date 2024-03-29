import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
  </Provider>
);
 