import React from "react";
import styled from "styled-components";

//type에 따라서 초록 버튼인지 회색 테두리 버튼인지 결정하게 수정하면 편함

const Button = styled.div`
  font-family: "GmarketSansMedium";
  width: 29.2rem;
  height: 7rem;
  cursor: pointer;
  display: inline-flex;
  width: 29.2rem;
  height: 7rem;
  background-color: white;
  border: 4px solid #374baa;
  margin: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

function AnswerButton({ idx, type, text, onclick }) {
  const onClickBtn = () => {
    onclick(idx);
  };

  return (
    <>
      <Button type={type} onClick={onClickBtn}>
        {text}
      </Button>
      <br />
    </>
  );
}

export default AnswerButton;
