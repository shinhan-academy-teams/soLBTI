import React from "react";
import { Link } from "react-router-dom";

function Adminpage(props) {
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h1>관리자 페이지</h1>
      <Link to="register">
        <button>입력</button>
      </Link>
    </div>
  );
}

export default Adminpage;
