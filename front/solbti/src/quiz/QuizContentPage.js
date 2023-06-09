import React, { useState } from "react";
import styled from "styled-components";
import questions from "./contents/questions";
import AnswerButton from "./components/AnswerBtn";
import Parser from "html-react-parser";
import RingLoader from "react-spinners/RingLoader";
import ResultPage from "./ResultPage";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";

const Wrapper = styled.div`
  display: ${(props) => (props.isShow === true ? "flex" : "none")};
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  align-items: center;
  width: 50rem;
`;

const Text = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 1.7rem;
  font-weight: light;
  margin: 0.5rem;
  text-align: center;
  color: black;
  margin-top: 3.9rem;
`;

function QuizContentPage({ isShow }) {
  const [questionNum, setQuestionNum] = useState(0);
  const [typeEI, setTypeEI] = useState(0);
  const [typeSN, setTypeSN] = useState(0);
  const [typeJP, setTypeJP] = useState(0);
  const [isProcess, setIsProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onConditionChange = (key) => {
    let record = questions[questionNum].answers[key].score;

    if (questionNum === 0 || questionNum === 5 || questionNum === 7) {
      setTypeJP(typeJP + record);
    } else if (questionNum === 1 || questionNum === 2 || questionNum === 4) {
      setTypeSN(typeSN + record);
    } else if (questionNum === 3 || questionNum === 6) {
      setTypeEI(typeEI + record);
    } else if (questionNum === 8) {
      setTypeEI(typeEI + record);
      setIsLoading(true);
      setTimeout(function () {
        setIsLoading(false);
        setIsProcess(true);
      }, 1000);
    }
    setQuestionNum(questionNum + 1);
  };
  if (questionNum < 9) {
    return (
      <>
        <Wrapper isShow={isShow}>
          <Container>
            <MDBProgress>
              <MDBProgressBar
                striped
                animated
                width={((questionNum + 1) * 100) / 9}
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            <Text>{Parser(questions[questionNum].question)}</Text>
            {questions[questionNum].answers.map((answer, index) => (
              <AnswerButton
                key={"answer-" + index}
                idx={index}
                text={Parser(answer.text)}
                onclick={onConditionChange}
              />
            ))}
          </Container>
        </Wrapper>
      </>
    );
  }
  if (questionNum === 9) {
    return (
      <>
        <Wrapper isShow={isLoading}>
          <RingLoader color="#7885F7" />
        </Wrapper>
        <Wrapper isShow={isProcess}>
          <ResultPage EI={typeEI} SN={typeSN} JP={typeJP} />
        </Wrapper>
      </>
    );
  }
}

export default QuizContentPage;
