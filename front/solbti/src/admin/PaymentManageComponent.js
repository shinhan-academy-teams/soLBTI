import axios from "axios";
import React, { useState } from "react";
import cheerio from "cheerio";

function PaymentManageComponent(props) {
  const API1_PROXY_URL = "https://moneypin.biz";
  const [num, setNum] = useState();
  const onChangeNum = (e) => {
    setNum(e.target.value);
    console.log(e.target.value);
  };
  const searchNum = () => {
    axios({
      url: `/bizno/detail/` + num,
      method: "get",
    })
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        const targetElement = $(".text-gray-850.text-sm.mt-3.lg\\:text-base");
        if (targetElement.length) {
          const information = targetElement.text().trim();
          console.log(information);
        } else {
          console.log("Target element not found.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h1>입력 페이지</h1>
      사업자 번호 : <input onChange={onChangeNum} />
      <button onClick={searchNum}> 조회</button>
    </div>
  );
}

export default PaymentManageComponent;
