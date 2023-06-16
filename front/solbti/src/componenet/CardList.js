import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Card, Row, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function CardList(props) {
  const [cardList, setCardList] = useState([]);
  var url = "/all-card.do";
  var option = props.option;

  const [search, setSearch] = useState("");
  const changeSearchHandle = (e) => {
    setSearch(e.target.value);
  };

  const searchSubmit = () => {
    if (searchCategory == "cardName") {
      url = "/card/search/";
    } else if (searchCategory == "cardBenefit") {
      url = "/card/searchByBenefit/";
    }

    axios({ method: "get", url: url + search })
      .then((res) => {
        setCardList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (option === "credit") {
    url = "/credit-card.do";
  } else if (option === "debit") {
    url = "/debit-card.do";
  }
  useEffect(() => {
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        setCardList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [searchCategory, setSearchCategory] = useState("cardName");

  const searchCategoryChangeHandle = (e) => {
    setSearchCategory(e.target.value);
  };

  // 카드 상세페이지 뷰 카운트
  function countView(cardno) {
    axios({
      method: "get",
      url: `/card/pageview/${cardno}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <FormControl>
        <InputLabel id="demo-simple-select-label">선택</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchCategory}
          label="Age"
          onChange={searchCategoryChangeHandle}
        >
          <MenuItem value="cardName">이름</MenuItem>
          <MenuItem value="cardBenefit">혜택</MenuItem>
        </Select>
      </FormControl>
      <TextField onChange={changeSearchHandle}></TextField>
      <Button onClick={searchSubmit}>검색</Button>
      <Row xs={1} md={3} className="g-4">
        {cardList.map((card, index) => (
          <Col key={index}>
            <Card style={{ width: "20rem" }}>
              <Card.Img variant="top" src={card.imgURL} />
              <Card.Body>
                <Badge bg="info">
                  {card.cardType === "credit" ? "신용" : "체크"}
                </Badge>
                <Card.Title>{card.cardName}</Card.Title>
                <Card.Text>{card.cardContent}</Card.Text>
                <Link to={`/cardlist/detail/${card.commonCardCode}`}>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      countView(card.commonCardCode);
                    }}
                  >
                    자세히 보기
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardList;
