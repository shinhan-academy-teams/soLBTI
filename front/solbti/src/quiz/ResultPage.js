import React, { useEffect, useState } from "react";
import results from "./contents/results";
import styled from "styled-components";
import Parser from "html-react-parser";
import axios from "axios";

const ResultTitle = styled.div`
  font-family: "양진체";
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  color: #374baa;
  margin-bottom: 5.5rem;
`;

const ResultImg = styled.img`
  position: absolute;
  width: 30rem;
`;

const Content = styled.div`
  position: absolute;
  font-family: "GmarketSansMedium";
  font-size: 1rem;
  color: #444444;
`;

const ResultSquare = styled.div`
  margin: 2.2rem;
  position: relative;
  display: flex;
  border: 5px solid #374baa;
  width: 40rem;
  height: 14rem;
  background-color: white;
  border-radius: 0.5rem;
  text-align: center;

  ${ResultImg} {
    justify-content: center;
    bottom: ${(props) => (props.isNormal < 16 ? "32rem" : "5rem")};
    left: 7rem;
  }

  ${Content} {
    width: 85%;
    left: 50%;
    word-break: keep-all;

    ${(props) =>
      props.isNormal < 16
        ? `transform: translateX(-50%);
        bottom : 2rem;`
        : `top: 50%;
        transform: translate(-50%, -50%);`};
  }
`;

function ResultPage({ EI, SN, JP }) {
  var result = "";
  EI >= 2 ? (result += "E") : (result += "I");
  SN >= 2 ? (result += "S") : (result += "N");
  JP >= 2 ? (result += "J") : (result += "P");

  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `/result/${results[result].name}`,
    })
      .then((res) => {
        setCategory(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <ResultTitle>{results[result].name}</ResultTitle>
      <ResultSquare>
        <ResultImg src={results[result].img} />
        <Content>{Parser(results[result].explain)}</Content>
      </ResultSquare>
      {category[1]}
      {category[2]}
      {category[3]}
    </>
  );
}

export default ResultPage;
