import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "mypage/keypad.css";
import SecurityKeypad from "componenet/SecurityKeypad";
import axios from "axios";
import styled from "styled-components";
import { useCookies } from "react-cookie";

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

function WriteMyInfo(props) {
  const [password, setPassword] = useState(""); //확정전 비밀번호
  const [pass, setPass] = useState(""); //확정난 비밀번호
  const { cno } = useParams();
  const [card, setCard] = useState({ paymentDate: 1 });
  const [cookies] = useCookies(["memCode"]);
  const [brand, setBrand] = useState([]); //원래 브랜드 객체
  const [selectedBrand, setSelectedBrand] = useState(""); //첫번째 브랜드

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "brand") setSelectedBrand(e.target.value);

    setCard({
      ...card,
      [e.target.name]: e.target.value,
      paymentDate: 1,
    });
  };

  //default event막기 ->왜냐하면 form은 기본으로 action이 들어가 있어서 axios가 적용이 안되고
  //자기 페이지로만 돌아가고 데이터를 디비에 전달하지 못함.

  const handlePass = () => {
    setCard({ ...card, password: pass });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
    });
    const requestData = {
      memCode: cookies.memCode,
      pCard: card,
    };
    console.log("card", card);
    console.log(selectedBrand + "<<brand");
    instance
      .post(`/cardlist/join.do/${cno}`, requestData)
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
        const loadBrand = responseData.data;
        setBrand(loadBrand);
        // console.log(loadBrand[1][0] + "<<loadBrand[0][0]");
        setSelectedBrand(loadBrand[0][0]);
        setCard({ ...card, brand: loadBrand[0][0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <Title>카드 신청</Title>
        <Content>신청정보를 입력해주세요</Content>
        <Container className="panel">
          <Form>
            <Label>영문 이름</Label>
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
            <Label>영문 성</Label>
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
            <Label>결제일</Label>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Col sm>
                <select name="paymentDate" onChange={handleChange}>
                  {Array.from({ length: 27 }, (_, index) => (
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
            <Label>카드 비밀번호</Label>
            <div>
              <SecurityKeypad
                password={password}
                setPassword={setPassword}
                setPass={setPass}
              ></SecurityKeypad>
              <Button onClick={handlePass}>pass확정</Button>
            </div>
            <br></br>
            <Label>연결 계좌</Label>
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
            <Label>브랜드</Label>
            <br></br>
            <select name="brand" value={selectedBrand} onChange={handleChange}>
              {brand.map((option, index) => {
                return (
                  <>
                    <option key={index} value={option[0]}>
                      {option[0]}
                    </option>
                  </>
                );
              })}
            </select>
            <div className="benefit-area"></div>
            <article className="card-benefit">
              <div className="inner-box3">
                <br></br>
                <h3>연회비</h3>
                <div className="benefit-area">
                  <Table aria-label="basic table">
                    <thead>
                      <tr>
                        <th>브랜드</th>
                        <th>옵션</th>
                        <th>기본</th>
                        <th>서비스</th>
                        <th>총연회비</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brand.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </article>
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
