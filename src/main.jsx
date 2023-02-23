import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MealsContext from "./context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MealsContext>
      <App />
    </MealsContext>
  </React.StrictMode>
);
