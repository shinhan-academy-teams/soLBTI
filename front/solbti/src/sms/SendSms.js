import axios from "axios";
import React from "react";

function SendSms(props) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
    axios({
      url: "/api/user/sms",
      method: "post",
      data: e,
    })
      .then((responseData) => {
        console.log("Successs!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {
        <div>
          <meta charSet="UTF-8" />
          <title>Send Mail</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
          />
          <div>
            <h1>전화번호 인증</h1>
            {
              <form onSubmit={handleClick}>
                <table>
                  <tbody>
                    <tr className="form-group">
                      <td>전화번호</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="to"
                          placeholder="전화번호를 입력하세요"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button className="btn btn-default" type="submit">
                  인증하기
                </button>
              </form>
            }
          </div>
        </div>
      }
    </div>
  );
}

export default SendSms;
