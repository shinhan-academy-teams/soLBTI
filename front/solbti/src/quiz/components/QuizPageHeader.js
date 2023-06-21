import React from "react";
import "./quizHeader.css";

function QuizPageHeader(props) {
  return (
    <header className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="/img/logo.png" alt="" />
        </a>
      </div>
    </header>
  );
}

export default QuizPageHeader;
