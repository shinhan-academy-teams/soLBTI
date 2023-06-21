import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Header2 from "./Header2";

function Layout(props) {
  return (
    <div
      style={{ background: "url(/img/hero-bg.png", backgroundSize: "cover" }}
    >
      <Header2 />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
