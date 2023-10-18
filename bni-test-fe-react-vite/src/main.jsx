import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./stores/auth/context";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./assets/main.css";
import { store } from "./stores/";
import { router } from "./config/routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
