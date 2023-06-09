import React, { useState, useEffect } from "react";
import axios from "axios";

function PaymentList(props) {
  let now = new Date();
  let now_year = now.getFullYear();
  let now_month = now.getMonth() + 1;
  const [mm, setMm] = useState(now_month);
  const [yyyy, setYyyy] = useState(now_year);

  const [totalpay, setTotalPay] = useState();
  const [payList, setPayList] = useState([]);

  useEffect(() => {
    axios({
      url: "/payment/total",
      method: "get",
      params: { year: yyyy, month: mm },
    })
      .then((response) => {
        setTotalPay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      url: "/payment/total",
      method: "get",
      params: { year: yyyy, month: mm },
    })
      .then((response) => {
        setTotalPay(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [yyyy, mm]);

  useEffect(() => {
    axios({
      url: "/payment/list.do",
      method: "get",
      params: { year: yyyy, month: mm },
    })
      .then((response) => {
        setPayList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [yyyy, mm]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>결제 내역</h1>
      <h3>날짜 선택</h3>
      <h2>
        {yyyy}년 {mm}월 총 결제금액: {totalpay}
      </h2>
      <br />
      <div style={{ width: "1500px", margin: "0 auto" }}>
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
                  //
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
