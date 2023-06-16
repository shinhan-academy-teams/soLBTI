import axios from "axios";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import styled2 from "styled-components";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#EFEFFB",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "70rem",
}));

const Title = styled2.div`
  font-family: "GmarketSansMedium";
  font-size: 2.5rem;
  text-align: center;
  color: #374BAA;
  margin-top: 1.9rem;
`;

const Content = styled2.div`
    font-family:'GmarketSansMedium';
    font-size:1.4rem;
    font-weight:400;
    text-align:center;
    color:#444444;
    margin-bottom:4rem;
    `;

function CardChart(props) {
  const [cardList, setCardList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/card-chart.do",
    })
      .then((res) => {
        setCardList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Title>SOLBTI 인기카드</Title>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        {cardList.map((card, index) => (
          <Item
            sx={{
              my: 3,
              mx: "auto",
              p: 2,
            }}
            key={index}
          >
            <Stack spacing={4} direction="row" alignItems="center">
              <h1>{index + 1}</h1>
              <img src={card.imgURL} alt="card_img" width={300} />
              <Content>{card.cardName}</Content>
              <Link to={`/cardlist/detail/${card.commonCardCode}`}>
                <Button variant="outlined" color="secondary">
                  카드 상세
                </Button>
              </Link>
            </Stack>
          </Item>
        ))}
      </Box>
    </div>
  );
}

export default CardChart;
