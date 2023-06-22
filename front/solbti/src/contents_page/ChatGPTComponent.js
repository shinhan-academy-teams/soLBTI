import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

function ChatGPTComponent(props) {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null); // chatContainerRef 추가

  const inputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChange = () => {
    setChat([question, ...chat]);
    setQuestion("");
    axios({
      method: "post",
      url: "/chat-gpt/ask",
      data: { question: question },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.hasOwnProperty("answer"));

        const newChat = [...chat];
        if (response.data.hasOwnProperty("answer") === true) {
          newChat.push({
            question: question,
            answer: response.data.answer.replace(/(\r\n|\n|\r)/gm, ""),
          });
        } else {
          newChat.push({
            question: question,
            answer: response.data.replace(/(\r\n|\n|\r)/gm, ""),
          });
        }
        setChat(newChat);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chat]);

  return (
    <div
      id="first"
      style={{
        margin: "0 auto",
        textAlign: "center",
        height: "80vh", // 부모 요소의 고정 높이 지정
      }}
    >
      <div
        ref={chatContainerRef}
        id="seconed"
        style={{
          width: "50rem", // 적절한 값으로 변경
          backgroundColor: "#E0FFFF",
          height: "calc(100% - 50px)",
          padding: "8px",
          borderRadius: "16px",
          margin: "0 auto", // 가운데 정렬 적용
          overflow: "auto", // 스크롤 생성
        }}
      >
        {chat.map((message, index) => (
          <div key={index}>
            {message.question && (
              <p
                style={{
                  textAlign: "right",
                  marginRight: "3rem",
                  marginTop: "1rem",
                }}
              >
                <span
                  style={{
                    backgroundColor: "	#00FF0080",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {message.question}
                </span>
                : 👨‍💻
              </p>
            )}
            {message.answer && (
              <p
                style={{
                  textAlign: "left",
                  marginLeft: "3rem",
                  marginTop: "1rem",
                }}
              >
                🤖 :
                <span
                  style={{
                    backgroundColor: "#C0C0C080",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {message.answer}
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        style={{
          border: "5px solid blue",
          width: `48rem`,
        }}
        value={question}
        onChange={inputChange}
      />
      <Button onClick={handleChange}> ➤ </Button>
    </div>
  );
}

export default ChatGPTComponent;
