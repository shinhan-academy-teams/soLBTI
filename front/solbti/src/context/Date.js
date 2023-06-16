import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const PayContext = createContext();

export const PayProvider = (props) => {
  let today = new Date();
  let now_year = today.getFullYear();
  let now_month = today.getMonth() + 1;

  const [cookies] = useCookies(["memCode"]);
  const [payList, setPayList] = useState([]);
  const [month, setMonth] = useState(now_month);
  const [year, setYear] = useState(now_year);
  const [totalpay, setTotalPay] = useState(0);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    // 카드 리스트 가져옴
    axios({
      url: "/api/auth/mycardlist.do",
      method: "get",
      params: { id: cookies.memCode },
    })
      .then((response) => {
        const cardlist = response.data.map((item) => item.personalCardCode);
        setCardList(cardlist);
        fetchPaymentList(cardlist, year, month);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchPaymentList = (list, y, m) => {
    //총 구매 내역

    axios({
      url: "/api/payment/list.do",
      method: "get",
      params: {
        year: y,
        month: m,
        cardlist: list.join(","),
      },
    })
      .then((response) => {
        console.log(response.data);
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

        console.log("s " + sum);
        console.log("L " + list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <PayContext.Provider
        value={{
          year,
          month,
          setYear,
          setMonth,
          payList,
          totalpay,
          cardList,
          fetchPaymentList,
        }}
      >
        {props.children}
      </PayContext.Provider>
    </div>
  );
};
