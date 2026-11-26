import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@vault/styles/01-precision-systems/fui-tactical/tokens.css";
import "./styles/shell.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
