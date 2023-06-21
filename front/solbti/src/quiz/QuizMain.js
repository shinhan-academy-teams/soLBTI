import React, { useEffect, useState } from "react";
import QuizPageHeader from "./components/QuizPageHeader";
import Aos from "aos";
import styled from "styled-components";
import QuizContentPage from "./QuizContentPage";
import StartButton from "./components/StartButton";

const Wrapper = styled.div`
  display: ${(props) => (props.isShow === true ? "flex" : "none")};
  width: 100%;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 10rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 36px;
  font-weight: 700;
  color: #012970;
`;

const Intro = styled.div`
  font-family: "GmarketSansMedium";
  color: #444444;
  margin: 15px 0 0 0;
  font-size: 20px;
`;

function QuizMain(props) {
  const [isShow, setIsShow] = useState(true);
  const [isQuizShow, setIsQuizShow] = useState(false);

  useEffect(() => {
    Aos.init();
  });

  const goHome = () => {
    window.location.href = "/home";
  };
  const startBtn = () => {
    setIsShow(false);
    setIsQuizShow(true);
  };

  return (
    <>
      <QuizPageHeader />
      <Wrapper isShow={isShow}>
        <Container>
          <Title data-aos="fade-up">나의 소비 습관 MBTI는?</Title>
          <Intro data-aos="fade-up">
            재미로 알아보는 나의 소비 MBTI 그리고 카드 추천까지!
          </Intro>
          <div data-aos="zoom-out" data-aos-delay="200">
            <img src="/img/hero-img.png" className="img-fluid" alt="" />
          </div>
          <StartButton type={true} text={"테스트 시작"} onclick={startBtn} />
        </Container>
      </Wrapper>
      <QuizContentPage isShow={isQuizShow} />
    </>
  );
}

export default QuizMain;
