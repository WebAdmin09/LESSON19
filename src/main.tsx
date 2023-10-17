import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from './redux/store'; // Redux store'ni import qiling
import AuthContextProvider from "./context/AuthContext.tsx";
import StoreProvider from "./redux/store/index.tsx";

import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
