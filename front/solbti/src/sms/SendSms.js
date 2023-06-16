import React from "react";

function SendSms(props) {
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
            <h1>텍스트 메일 보내기</h1>
            <form action="@{/sms/send}" method="post">
              <table>
                <tbody>
                  <tr className="form-group">
                    <td>발송할 전화번호</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="to"
                        placeholder="이메일 주소를 입력하세요"
                      />
                    </td>
                  </tr>
                  <tr className="form-group">
                    <td>내용</td>
                    <td>
                      <textarea
                        className="form-control"
                        name="content"
                        placeholder="보낼 내용을 입력하세요"
                        defaultValue={" "}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-default">발송</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default SendSms;
