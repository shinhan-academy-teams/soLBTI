import React, { useEffect, useState } from "react";
import results from "./contents/results";
import styled from "styled-components";
import Parser from "html-react-parser";
import axios from "axios";
import CardModal from "./components/CardModal";
import cookies from "react-cookies";
import { useCookies } from "react-cookie";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  margin-top: 3rem;
`;

const ResultTitle = styled.div`
  font-family: "양진체";
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  color: #374baa;
  margin-bottom: 6rem;
`;

const ResultImg = styled.img`
  position: absolute;
  width: 13rem;
`;

const Content = styled.div`
  position: absolute;
  font-family: "GmarketSansMedium";
  font-size: 1rem;
  color: #444444;
`;

const ResultSquare = styled.div`
  margin: 2rem;
  position: relative;
  display: flex;
  border: 5px solid #374baa;
  width: 40rem;
  height: 18rem;
  background-color: white;
  border-radius: 0.5rem;
  text-align: center;

  ${ResultImg} {
    justify-content: center;
    bottom: 11rem;
    left: 13rem;
  }

  ${Content} {
    width: 85%;
    left: 50%;
    word-break: keep-all;
    bottom: 5rem;

    ${(props) =>
      props.isNormal < 16
        ? `transform: translateX(-50%);
        bottom : 5rem;`
        : `top: 50%;
        transform: translate(-50%, -50%);`};
  }
`;

const Title = styled.div`
  font-family: "양진체";
  font-size: 1.5rem;
  text-align: center;
  color: #444444;
  margin-top: 3rem;
`;

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: 2rem;
`;

const MatchElement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SubTitle = styled.div`
  font-family: "양진체";
  font-size: 1.2rem;
  text-align: center;
  color: #444444;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SmallSub = styled.div`
  text-align: center;
  font-family: "GmarketSansMedium";
  font-weight: 400;
  font-size: 1rem;
  color: #374baa;
`;

const MatchSqaure = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  background-color: white;
  border-radius: 0.5rem;
  text-align: center;
  border: 2px solid #374baa;

  ${SmallSub} {
    margin-top: 1.7rem;
  }
`;

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

function ResultPage({ EI, SN, JP }) {
  var result = "";
  EI >= 2 ? (result += "E") : (result += "I");
  SN >= 2 ? (result += "S") : (result += "N");
  JP >= 2 ? (result += "J") : (result += "P");

  const [category, setCategory] = useState([]);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState({ open: false });
  const [cookie, setCookie] = useCookies(["accessToken", "memCode"]);
  const [memCode, setmemCode] = useState(cookie.memCode);

  useEffect(() => {
    axios({
      method: "get",
      url: `/result/${results[result].name}`,
    })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRecommend = () => {
    axios({
      method: "get",
      url: "/recommend",
      params: {
        category1: category["1"],
        category2: category["2"],
        category3: category["3"],
      },
    })
      .then((res) => {
        setCards(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setPopup({ open: true });
  };

  const handleSaveType = () => {
    cookies.save("type", results[result].name);
    memCode
      ? (window.location.href = "/home")
      : (window.location.href = "/auth/login");
  };

  return (
    <>
      <Wrapper>
        <Container>
          <ResultTitle>{results[result].name}</ResultTitle>
          <ResultSquare>
            <ResultImg src={results[result].img} />
            <Content>{Parser(results[result].explain)}</Content>
          </ResultSquare>
          <Title>{results[result].name}들의 소비는?💷</Title>
          <FlexLayout>
            <MatchElement>
              <SubTitle>1위</SubTitle>
              <MatchSqaure>
                <SmallSub>{category[1]}</SmallSub>
              </MatchSqaure>
            </MatchElement>
            <MatchElement>
              <SubTitle>2위</SubTitle>
              <MatchSqaure>
                <SmallSub>{category[2]}</SmallSub>
              </MatchSqaure>
            </MatchElement>
            <MatchElement>
              <SubTitle>3위</SubTitle>
              <MatchSqaure>
                <SmallSub>{category[3]}</SmallSub>
              </MatchSqaure>
            </MatchElement>
          </FlexLayout>
          <FlexLayout>
            <MatchElement>
              <Button onClick={handleRecommend}>추천 카드 보기</Button>
            </MatchElement>
            <MatchElement>
              <Button onClick={handleSaveType}>유형 저장하기</Button>
            </MatchElement>
          </FlexLayout>
        </Container>
      </Wrapper>
      <CardModal open={popup.open} setPopup={setPopup} cards={cards} />
    </>
  );
}

export default ResultPage;
