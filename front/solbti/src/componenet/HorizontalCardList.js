import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const Block = styled.div`
  background-color: white;
  display: inline-block;
`;

function HorizontalCardList(props) {
  const [cardList, setCardList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/all-card.do",
    })
      .then((res) => {
        setCardList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <ScrollMenu>
        {cardList.map((card, index) => (
          <Block>
            <img
              src={card.imgURL}
              alt="카드이미지"
              style={{ transform: "rotate(90deg)", width: "200px" }}
            />
          </Block>
        ))}
      </ScrollMenu>
    </Container>
  );
}

export default HorizontalCardList;
