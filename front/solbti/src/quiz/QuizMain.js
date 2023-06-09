import React, { useState } from "react";
import { Link } from "react-router-dom";

function QuizMain(props) {
  const [start, setStart] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setStart(!start);
        }}
      >
        테스트 시작
      </button>
      <Link to="/home">
        <button>홈페이지로 가기</button>
      </Link>
      {start && <QuizContent />}
    </div>
  );
}

const QuizContent = () => {
  return (
    <>
      <h2 id="title" class="text-center mt-5">
        문제
      </h2>
      <input type="hidden" id="type" value="EI" />
      <button id="A" type="button" className="btn btn-primary mt-5">
        Primary
      </button>
      <button id="B" type="button" className="btn btn-primary mt-5">
        Primary
      </button>
    </>
  );
};

export default QuizMain;
