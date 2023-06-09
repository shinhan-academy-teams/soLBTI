import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyInfoCheck(props) {
  const [members, setMembers] = useState([]);

  //   useEffect(() => {
  //     const requestOption = {
  //       method: "GET",
  //       redirect: "follow",
  //     };
  //   });
  return (
    <div>
      <h1>카드 신청</h1>
      <h2>신청인 정보를 입력해주세요.</h2>
      <Container className="panel">
        <Form>
          이름
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="name"
                name="세션에서 가져올 name"
                readOnly="readOnly"
              />
            </Col>
          </Form.Group>
          전화번호
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
            readOnly="readonly"
          >
            <Col sm>
              <Form.Control
                type="text"
                placeholder="phonenumber"
                name="phonenumber"
                readOnly="readOnly"
              />
            </Col>
          </Form.Group>
          <div className="d-grid gap-1">
            <Link to={"/cardlist/myinfoauth"}>
              <Button variant="secondary" type="submit">
                다음
              </Button>
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default MyInfoCheck;
