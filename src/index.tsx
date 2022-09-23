import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";

export const endpoint = "https://api.entur.io/journey-planner/v3/graphql";
export const headers = {
  "Content-Type": "application/json",
  "ET-Client-Name": "henrik-gjensidige_test",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
