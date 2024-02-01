import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <FluentProvider theme={teamsLightTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FluentProvider>
);
