import React from "react";
import styled from "styled-components";

//type에 따라서 초록 버튼인지 회색 테두리 버튼인지 결정하게 수정하면 편함

const Button = styled.div`
  width: 12rem;
  height: 5rem;
  //   transition: 0.5s;
  font-family: "GmarketSansMedium";
  font-size: 20px;
  line-height: 45px;
  padding: 20px 40px;
  border-radius: 0.8rem;
  color: #fff;
  background: #7885f7;
  box-shadow: 0px 5px 30px rgba(65, 84, 241, 0.4);
  cursor: pointer;
  margin: auto;
  margin-top: 15px;
`;

function StartButton({ idx, type, text, onclick }) {
  const onClickBtn = () => {
    onclick(idx);
  };

  return (
    <Button type={type} onClick={onClickBtn}>
      {text}
    </Button>
  );
}

export default StartButton;
