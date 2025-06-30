import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./reusables/user/login.css";
import "./reusables/user/signup.css";
import "./reusables/Header.css";
import "./create.css";
import "./display.css";
import "./home.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
