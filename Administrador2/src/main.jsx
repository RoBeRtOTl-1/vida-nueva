import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)