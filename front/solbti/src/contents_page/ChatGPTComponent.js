import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function ChatGPTComponent(props) {
  const [pastQuestions, setPastQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);

  const inputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChange = () => {
    setPastQuestions([question, ...pastQuestions]);
    axios({
      method: "post",
      url: "/chat-gpt/ask",
      data: { question: question },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log(response.data.hasOwnProperty("answer"));

        if (response.data.hasOwnProperty("answer") === true) {
          setAnswer([response.data.answer, ...answer]);
        } else setAnswer([response.data, ...answer]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h3>입력창입니다.</h3>
      <input
        type="text"
        style={{ border: "5px solid blue" }}
        value={question}
        onChange={inputChange}
      />
      <Button onClick={handleChange}> ➤ </Button>
      {pastQuestions.map((question, index) => (
        <p key={index}>👨‍💻 : {question}</p>
      ))}
      {answer.map((message, index) => (
        <div key={index}>
          <p>🤖 : {message}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatGPTComponent;
