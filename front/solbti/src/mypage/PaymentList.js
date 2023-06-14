import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Graphcomponent from "./Graphcomponent";

function PaymentList(props) {
  let now = new Date();
  let now_year = now.getFullYear();
  let now_month = now.getMonth() + 1;
  const [mm, setMm] = useState(now_month);
  const [yyyy, setYyyy] = useState(now_year);

  const [totalpay, setTotalPay] = useState(0);
  const [payList, setPayList] = useState([]);

  const [cookies] = useCookies(["memCode"]);

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    // 카드 리스트 가져옴
    axios({
      url: "/auth/mycardlist.do",
      method: "get",
      params: { id: cookies.memCode },
    })
      .then((response) => {
        const cardlist = response.data.map((item) => item.personalCardCode);
        setCardList(cardlist);
        fetchPaymentList(cardlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchPaymentList = (list) => {
    //총 구매 내역

    axios({
      url: "/payment/list.do",
      method: "get",
      params: {
        year: yyyy,
        month: mm,
        cardlist: list.join(","),
      },
    })
      .then((response) => {
        let sum = 0;
        let list = response.data.sort((a, b) => {
          return a.paymentDate.localeCompare(b.paymentDate);
        });
        list.map((item) => {
          // 총 구매 내역
          sum += item.price;
        });

        setTotalPay(sum);
        setPayList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (yyyy && mm && cardList.length > 0) {
      // yyyy와 mm 값이 존재하고 cardList 배열이 비어 있지 않을 때에만 실행
      // 추가적인 로직 또는 Graphcomponent의 prop 설정 등을 수행
      // 예시로는 Graphcomponent를 출력하는 부분을 넣었습니다.
      // console.log("yyyy:", yyyy);
      // console.log("mm:", mm);
      // console.log("cardList:", cardList);
    }
  }, [yyyy, mm, cardList]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>결제 내역</h1>
      <h3>날짜 선택</h3>
      <h2>
        {yyyy}년 {mm}월 총 결제금액: {totalpay.toLocaleString()} 원
      </h2>
      <br />

      {yyyy && mm && cardList.length > 0 && (
        <div>
          <Graphcomponent yyyy={yyyy} mm={mm} cardList={cardList} />
        </div>
      )}
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
