import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function JoinCard(props) {
  const { cno } = useParams();
  //useState는 상태관리로 리액트가 관리해야할 것 중에 내가 관리할것을 따로 설정해준다.
  const [card, setCard] = useState({});
  const handleChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };
  const handleInsert = (event) => {
    //default event막기 ->왜냐하면 form은 기본으로 action이 들어가 있어서 axios가 적용이 안되고
    //자기 페이지로만 돌아가고 데이터를 디비에 전달하지 못함.
    event.preventDefault();

    axios({
      method: "post",
      url: `/api/cardlist/join.do/${cno}`, //주소 형식과 맞춰줌
      data: card,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Container className="panel">
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="serialNumber"
                name="serialNumber"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="cardCVC"
                name="cardCVC"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="last_name"
                name="lastName"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="first_name"
                name="firstName"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="account"
                name="account"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="date"
                placeholder="payment_date"
                name="paymentDate"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="brand"
                name="brand"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <div className="d-grid gap-1">
            <Button variant="secondary" type="submit" onClick={handleInsert}>
              카드 신청하기
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default JoinCard;
