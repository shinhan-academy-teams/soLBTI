import axios from "axios";
import React, { useState } from "react";

function SendSms() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      // 서버에 인증번호 요청
      const response = await axios.post("/user/request-sms", { phoneNumber });
      // 인증번호 요청에 성공한 경우
      setIsCodeRequested(true);
    } catch (error) {
      console.log(error);
      // 인증번호 요청에 실패한 경우
    }
  };
  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //     axios({
  //       url: "/user/sms",
  //       method: "post",
  //       data: { phoneNumber: e.target[0].value },
  //     })
  //       .then((responseData) => {
  //         console.log("Successs!");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      // 서버에 인증번호 검증 요청
      const response = await axios.post("/user/verify-sms", {
        phoneNumber,
        authCode,
      });
      // 인증번호 검증에 성공한 경우
      setIsCodeVerified(true);
    } catch (error) {
      console.log(error);
      // 인증번호 검증에 실패한 경우
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  return (
    <div>
      <h1>전화번호 인증</h1>
      <form>
        <div>
          <label>전화번호:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        {!isCodeRequested && (
          <button onClick={handleRequestCode}>인증번호 요청</button>
        )}

        {isCodeRequested && (
          <div>
            <div>
              <label>인증번호:</label>
              <input
                type="text"
                value={authCode}
                onChange={handleAuthCodeChange}
              />
            </div>

            <button onClick={handleVerifyCode}>인증하기</button>
          </div>
        )}
      </form>

      {isCodeVerified && <p>인증이 완료되었습니다.</p>}
    </div>
  );
}
export default SendSms;

// function SendSms(props) {
//   const handleClick = (e) => {
//     e.preventDefault();
//     console.log(e);
//     axios({
//       url: "/user/sms",
//       method: "post",
//       data: { phoneNumber: e.target[0].value },
//     })
//       .then((responseData) => {
//         console.log("Successs!");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <div>
//       {
//         <div>
//           <meta charSet="UTF-8" />
//           <title>Send Mail</title>
//           <link
//             rel="stylesheet"
//             href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
//           />
//           <div>
//             <h1>전화번호 인증</h1>
//             {
//               <form>
//                 <table>
//                   <tbody>
//                     <tr className="form-group">
//                       <td>전화번호</td>
//                       <td>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="to"
//                           placeholder="전화번호를 입력하세요"
//                         />
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 <button className="btn btn-default" onClick={handleClick}>
//                   인증하기
//                 </button>
//               </form>
//             }
//           </div>
//         </div>
//       }
//     </div>
//   );
// }
// export default SendSms;
