import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./cardDetail.css";

function CardDetail(props) {
  const { cno } = useParams();
  const [card, setCard] = useState({});
  const [benefit, setBenefit] = useState({});
  const [brand, setBrand] = useState({});

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
      .then((responseData) => {
        setBenefit(responseData.data);
        console.log(Object.keys(benefit));
        console.log(Object.values(benefit));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  return (
    <div className="card-detail">
      {/* 기본 카드 정보 */}
      <article className="card-info">
        <div className="inner-box">
          <div className="card-img">
            <img src={card.imgURL} alt="카드 이미지" width={400} />
          </div>
          <div className="card-name">
            <h1>{card.cardName}</h1>
            <p>{card.cardContent}</p>
            <Link to={`/cardlist/join/${cno}`}>
              <Button className="btn-join">카드 가입하기</Button>
            </Link>
          </div>
        </div>
      </article>

      {/* 카드 혜택 */}
      <article className="card-benefit">
        <div className="inner-box2">
          <h3>주요 혜택</h3>
          <div className="benefit-area">
            <p>{brand[0]}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default CardDetail;
