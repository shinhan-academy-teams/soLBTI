import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "mypage/keypad.css";
import SecurityKeypad from "componenet/SecurityKeypad";

function WriteMyInfo(props) {
  const [password, setPassword] = useState({});

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <h1>카드 신청</h1>
        <h2>신청정보를 입력해주세요</h2>
        <Container className="panel">
          firstname, lastname, paymentdate, pwd(보안키패드 적용 + sha256)
          ,account , brand 입력받기
          <Form>
            성
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Col sm>
                <Form.Control
                  type="text"
                  placeholder="firstname"
                  name="firstname"
                />
              </Col>
            </Form.Group>
            이름
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Col sm>
                <Form.Control
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                />
              </Col>
            </Form.Group>
            결제일
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Col sm>
                <select name="paymentdate">
                  {Array.from({ length: 31 }, (_, index) => (
                    <option
                      key={index + 1}
                      value={index + 1}
                      style={{ order: 31 - index }}
                    >
                      {index + 1}
                    </option>
                  ))}
                </select>
              </Col>
            </Form.Group>
            비밀번호
            <div>
              <SecurityKeypad> </SecurityKeypad>
            </div>
            <br></br>
            계좌
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
                />
              </Col>
            </Form.Group>
            브랜드
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Col sm>
                <Form.Control type="text" placeholder="brand" name="brand" />
              </Col>
            </Form.Group>
            <div className="d-grid gap-1">
              <Link to={"/cardlist/agree"}>
                <Button variant="secondary" type="submit">
                  다음
                </Button>
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default WriteMyInfo;
