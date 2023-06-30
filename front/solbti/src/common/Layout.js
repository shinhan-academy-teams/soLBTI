import React from "react";
import Header from "./Header";

function Layout(props) {
  return (
    <div
      style={{ background: "url(/img/hero-bg.png", backgroundSize: "cover" }}
    >
      <Header />
      <main>{props.children}</main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
