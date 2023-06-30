import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 2.5rem;
  text-align: center;
  color: #374baa;
  margin-top: 1.9rem;
`;

const Content = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  color: #444444;
  margin-bottom: 4rem;
`;

const Label = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 1rem;
  color: #444444;
`;

function MyInfoCheck(props) {
  const [member, setMember] = useState([]);
  const { cno } = useParams();
  const [cookies] = useCookies(["memCode"]);
  useEffect(() => {
    axios({
      method: "get",
      url: `/auth/member-info.do/${cookies.memCode}`,
    })
      .then((res) => {
        setMember(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Title>카드 신청</Title>
      <Content>신청인 정보를 확인해주세요.</Content>
      <Container className="panel">
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Label>이름</Label>
            <Col sm>
              <Form.Control
                type="text"
                value={member.memName}
                readOnly="readOnly"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
            readOnly="readonly"
          >
            <Label>연락처</Label>
            <Col sm>
              <Form.Control
                type="text"
                value={
                  member.memPhone
                    ? member.memPhone.replace(
                        /(\d{3})(\d{4})(\d{4})/,
                        "$1-$2-$3"
                      )
                    : member.memPhone
                }
                readOnly="readOnly"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
            readOnly="readonly"
          >
            <Label>이메일</Label>
            <Col sm>
              <Form.Control
                type="text"
                value={member.memEmail}
                readOnly="readonly"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
            readOnly="readonly"
          >
            <Label>주소</Label>
            <Col sm>
              <Form.Control
                type="text"
                value={member.memAddr}
                readOnly="readOnly"
              />
            </Col>
          </Form.Group>
          <div className="d-grid gap-1">
            <Link to={`/cardlist/writemyinfo/${cno}`} state={{ cno: cno }}>
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
