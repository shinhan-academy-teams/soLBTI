import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Button, Card, Row, Badge } from "react-bootstrap";

function CardList(props) {
  const [cardList, setCardList] = useState([]);
  var url = "/all-card.do";
  var option = props.option;
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
  return (
    <div className="container">
      <h1>{props.onption}</h1>
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
                <Button variant="secondary">자세히 보기</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardList;
