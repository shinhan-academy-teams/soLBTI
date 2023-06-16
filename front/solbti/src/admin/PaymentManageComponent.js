import axios from "axios";
import React, { useState } from "react";
import cheerio from "cheerio";

function PaymentManageComponent(props) {
  const [num, setNum] = useState();
  const [arr, setArr] = useState([]);
  const onChangeNum = (e) => {
    let n = e.target.value;
    setNum(n);
  };
  const onChangeNumtoArr = async () => {
    console.log(num);
    if (num) {
      const temp = num.replace(/-/g, "");
      const tempArray = temp.split(" ");
      console.log(tempArray);
      if (tempArray) {
        for (let i = 0; i < tempArray.length; i++) {
          const item = tempArray[i];
          try {
            const response = await axios.get(`/bizno/detail/${item}`);
            const html = response.data;
            const $ = cheerio.load(html);
            const targetElement = $(
              ".text-gray-850.text-sm.mt-3.lg\\:text-base"
            );

            if (targetElement.length) {
              const information = targetElement.text().trim();
              setArr((prevArr) => [...prevArr, information]);
              console.log(information);
            } else {
              console.log("Target element not found.");
            }
          } catch (error) {
            console.log(error);
          }
          if (i < tempArray.length - 1) {
            await sleep(3000); // 2초 간격 대기 함수 호출
          }
        }
      }
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const searchNum = (d) => {};
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h1>입력 페이지</h1>
      사업자 번호 : <input onChange={onChangeNum} className="input" />
      <button onClick={onChangeNumtoArr}> 조회</button>
      {/* {arr && <p>{arr.join(", ")}</p>} */}
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <table>
          <thead>
            <tr>
              <th>업종</th>
            </tr>
          </thead>
          <tbody>
            {arr &&
              arr.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentManageComponent;
