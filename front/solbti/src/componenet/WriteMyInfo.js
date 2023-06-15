import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "mypage/keypad.css";
import SecurityKeypad from "componenet/SecurityKeypad";
import axios from "axios";

function WriteMyInfo(props) {
  const [password, setPassword] = useState("");
  const { cno } = useParams();
  const [card, setCard] = useState({});
  const [brand, setBrand] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setCard({ ...card, [e.target.name]: e.target.value });
    //default event막기 ->왜냐하면 form은 기본으로 action이 들어가 있어서 axios가 적용이 안되고
    //자기 페이지로만 돌아가고 데이터를 디비에 전달하지 못함.
  };
  const handlePass = () => {
    setCard({ ...card, password });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
    });
    console.log("card", card);
    instance
      .post(`/cardlist/join.do/${cno}`, card)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      url: `/card/${cno}/brand`,
      method: "get",
    })
      .then((responseData) => {
        setBrand(responseData.data);
        console.log(brand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const SelectBox = ({ onChange, name }) => {
    return (
      <select name={name} onChange={onChange}>
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
                  name="firstName"
                  onChange={handleChange}
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
                  name="lastName"
                  onChange={handleChange}
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
                <select name="paymentDate" onChange={handleChange}>
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
              <SecurityKeypad
                password={password}
                setPassword={setPassword}
              ></SecurityKeypad>
              <Button onClick={handlePass}>pass확정</Button>
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
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            브랜드
            <br></br>
            <SelectBox onChange={handleChange} name="brand"></SelectBox>
            <div className="benefit-area">
              <p>{brand[0]}</p>
            </div>
            <br></br>
            <div className="d-grid gap-1">
              <br></br>
              <Button variant="secondary" onClick={handleClick}>
                다음
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default WriteMyInfo;
