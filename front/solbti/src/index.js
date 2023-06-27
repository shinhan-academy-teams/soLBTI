import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";

import Layout from "common/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));

const mainStyle = {
  backgroundImage: `url("/img/hero-bg.png")`,
  backgroundSize: "cover",
  height: "100vh",
};

root.render(
  <div style={mainStyle}>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </div>
);
reportWebVitals();
