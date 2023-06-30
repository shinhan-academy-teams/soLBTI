import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./cardDetail.css";
import { Table } from "@mui/joy";

function CardDetail(props) {
  const { cno } = useParams();
  const [card, setCard] = useState({});
  const [benefit, setBenefit] = useState([{}]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios({
      url: `/card-detail.do/${cno}`,
      method: "get",
    })
      .then((responseData) => {
        setCard(responseData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios({
      url: `/card/${cno}/benefit`,
      method: "get",
    })
      .then((response) => {
        console.log(response.data);

        response.data.map((item, index) => {
          setBenefit((prevArray) => [...prevArray, item]);
        });

        console.log(benefit);
      })
      .catch((error) => {
        console.log(error);
      });

    axios({
      url: `/card/${cno}/brand`,
      method: "get",
    })
      .then((responseData) => {
        setBrands(responseData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="card-detail">
      {/* 기본 카드 정보 */}
      <article className="card-info">
        <div className="inner-box">
          <div className="card-img">
            <img src={card.imgURL} alt="카드 이미지" width={400} />
          </div>
          <div className="card-name" style={{ width: "100rem" }}>
            <h1>{card.cardName}</h1>
            <p>{card.cardContent}</p>
            <Link to={`/cardlist/join/${cno}`}>
              <Button className="btn-join">카드 가입하기</Button>
            </Link>
          </div>
        </div>
      </article>

      <article>
        <div className="inner-box2">
          <h3>주요 혜택</h3>
          <div className="benefit-area">
            <Table>
              <tbody>
                {benefit.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ width: "20%" }}>{item.title}</td>
                      <td>{item.content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </article>

      {/* 카드 브란도 */}
      <article className="card-benefit">
        <div className="inner-box3">
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
                {brands.map((item, index) => {
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
    </div>
  );
}

export default CardDetail;
