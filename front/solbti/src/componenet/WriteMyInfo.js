import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "mypage/keypad.css";
import SecurityKeypad from "componenet/SecurityKeypad";
import axios from "axios";

function WriteMyInfo(props) {
  const [password, setPassword] = useState({});
  const { cno } = useParams();
  const [card, setCard] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setCard({ ...card, [e.target.name]: e.target.value });
    //default event막기 ->왜냐하면 form은 기본으로 action이 들어가 있어서 axios가 적용이 안되고
    //자기 페이지로만 돌아가고 데이터를 디비에 전달하지 못함.

    const instance = axios.create({
      withCredentials: true,
    });

    instance
      .post(`/cardlist/join.do/${cno}`, card)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const SelectBox = () => {
    return (
      <select>
        <option key="town" value="town">
          국내
        </option>
        <option key="visa" value="visa">
          visa
        </option>
        <option key="s&" value="s&">
          s&
        </option>
        <option key="union pay" value="union pay">
          union pay
        </option>
        <option key="마스터카드" value="마스터카드">
          마스터카드
        </option>
      </select>
    );
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
            <br></br>
            <SelectBox></SelectBox>
            <br></br>
            <div className="d-grid gap-1">
              <Link to={"/cardlist/agree"}>
                <br></br>
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
