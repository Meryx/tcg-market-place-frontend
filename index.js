import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <FluentProvider theme={teamsLightTheme}>
    <App />
  </FluentProvider>
);
