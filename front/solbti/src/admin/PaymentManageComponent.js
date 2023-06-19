import axios from "axios";
import React, { useEffect, useState } from "react";
import cheerio from "cheerio";

function PaymentManageComponent(props) {
  const API1_PROXY_URL = "https://moneypin.biz";
  const [num, setNum] = useState();
  const [brn, setBrn] = useState();
  const [brnArray, setBrnArray] = useState([]);
  const onChangeNum = (e) => {
    setNum(e.target.value);
    //console.log(e.target.value);
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
          setBrn(information);
        } else {
          console.log("Target element not found.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toArray = () => {
    const myArray = num.split("\n");
    console.log("myArray : " + myArray);
    let tmp;
    for (let i = 0; i < myArray.length; i++) {
      tmp = myArray[i].replace(/-/g, "");
      //console.log(tmp);
      //setBrnArray([...brnArray, tmp]);

      axios({
        url: `/bizno/detail/` + tmp,
        method: "get",
      })
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);

          const targetElement = $(".text-gray-850.text-sm.mt-3.lg\\:text-base");
          if (targetElement.length) {
            const information = targetElement.text().trim();
            //console.log(information);
            setBrn(information);
          } else {
            console.log("Target element not found.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log(brn);
    setBrnArray([...brnArray, brn]);
  }, [brn]);

  const consolePrint = () => {
    console.log(brnArray);
  };

  return (
    <>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <h1>입력 페이지</h1>
        사업자 번호 : <input onChange={onChangeNum} />
        <button onClick={searchNum}> 조회</button>
        <br></br>긴 사업자 번호
        <textarea onChange={onChangeNum}></textarea>
        <button onClick={toArray}> 조회</button>
        <button onClick={consolePrint}>ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ</button>
      </div>

      <div>
        {brnArray.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </>
  );
}

export default PaymentManageComponent;
