import React from "react";
import "./quizHeader.css";
import styled from "styled-components";

const Button = styled.div`
  //   width: 12rem;
  //   height: 5rem;
  //   transition: 0.5s;
  font-family: "GmarketSansMedium";
  line-height: 0;
  padding: 20px 40px;
  border-radius: 0.8rem;
  color: #fff;
  background: #90bdff;
  cursor: pointer;
`;

function QuizPageHeader(props) {
  const onClickBtn = () => {
    window.location.href = "/home";
  };
  return (
    <header className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="/img/logo.png" alt="" />
        </a>
        <Button onClick={onClickBtn}>홈페이지</Button>
      </div>
    </header>
  );
}

export default QuizPageHeader;
