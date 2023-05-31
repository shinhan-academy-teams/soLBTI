import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import Graphcomponent from "mypage/Graphcomponent";

function Layout(props) {
  return (
    <div>
      <Header></Header>
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
