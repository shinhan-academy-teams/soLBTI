import React, { useState, useEffect, useContext } from "react";
import Graphcomponent from "mypage/Graphcomponent";
import DateSelectComponent from "mypage/DateSelectComponent";
import { PayContext } from "context/Date";
import styled from "styled-components";

const Title = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 2.5rem;
  text-align: center;
  color: #374baa;
`;

const Content = styled.div`
  font-family: "GmarketSansMedium";
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  color: #444444;
`;

function PaymentList(props) {
  const { year, month, payList, cardList, totalpay } = useContext(PayContext);
  console.log("payment list page:", year);
  console.log("payment list page:", month);
  console.log("payment list page: ", payList);

  useEffect(() => {
    if (year && month) {
      // year와 month 값이 존재하고 cardList 배열이 비어 있지 않을 때에만 실행
    }
  }, [year, month]);

  return (
    <div>
      <Title>결제 내역</Title>

      <Content>
        {year}년 {month}월 총 결제금액: {totalpay.toLocaleString()} 원
      </Content>

      <br />

      {cardList.length > 0 && (
        <div>
          <Graphcomponent yyyy={year} mm={month} cardList={cardList} />
        </div>
      )}
      <br />
      <div style={{ width: "1500px", margin: "0 auto" }}>
        <div
          style={{
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              textAlign: "left",
              margin: "0",
              fontWeight: "bold",
              marginRight: "10px",
              marginLeft: "10px",
            }}
          >
            날짜 선택
          </span>

          <DateSelectComponent />
        </div>
        <table
          className="table table-striped-rows"
          style={{ textAlign: "center" }}
        >
          <thead className="table-dark">
            <tr>
              <th>결제 건</th>
              <th>결제일</th>
              <th>결제 금액</th>
              <th>결제 장소</th>
              <th>업종</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {payList.map((pay, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {pay.paymentDate.substring(0, pay.paymentDate.indexOf("T"))}
                  {pay.paymentDate.substring(
                    pay.paymentDate.indexOf("T") + 1,
                    pay.paymentDate.indexOf(".")
                  )}
                </td>
                <td>{pay.price}</td>
                <td>{pay.storeName}</td>
                <td>{pay.storeCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentList;
