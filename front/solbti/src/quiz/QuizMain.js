import React from "react";
import "./quizMain.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

var now = 1;
var q = {
  1: {
    title: "새해가 밝았다! 올 한해 내가 투자하고 싶은 것은?",
    type: "TF",
    A: "삶의 만족도를 높여줄 나만의 새로운 취미에 투자!",
    B: "몸도 마음도 건강하게 만들어 줄 친환경 라이프에 투자!",
  },
  2: {
    title: "코 앞으로 다가온 설 명절. 가족들을 위한 나의 선물은",
    type: "SN",
    A: "더 꼼꼼하게 체크 히야지!오프라인에서 직접 보고 구매한다.",
    B: "요즘에는 온라인도 잘 되어 있으니까! 온라인으로 찾아 보고 구매한다.",
  },
  3: {
    title:
      "추운 날씨 탓인지 배달음식을 자주 먹게되는 요즘, 문득 드는 생각은...",
    type: "TF",
    A: "점점 얇아지는 지갑을 보면서 씁쓸함이 밀려온다.",
    B: "쌓여가는 플라스틱을 보면서 마음 한 켠 죄책감이 밀려온다.",
  },

  4: {
    title: "드디어 포근한 봄이 찾아왔다! 새로운 봄 옷 장만을 위해 나는",
    type: "SN",
    A: "옷 가게에서 직접 입어보며 소재, 사이즈 등을 체크해 본다.",
    B: "쇼핑 앱에서 맞춤 필터를 적용해서 좋아하는 디자인만 모아서 본다.",
  },
  5: {
    title: "마음이 훈훈해지는 5월. 모처럼 가족들과 시간을 보내기로 했다!",
    type: "EI",
    A: "함께 즐기기 좋은 프로그램을 하러 가 잊지 못할 추억을 남긴다.",
    B: "오늘만큼은 따뜻한 집에서 가족들만의 오붓한 시간을 보낸다.",
  },
  6: {
    title: "상반기의 마지막인 6월, 생필품도 슬슬 바닥을 보이기 시작했다.",
    type: "SN",
    A: "장은 직접 보는 게 낫지! 자주 가는 마트로 출발",
    B: "어차피 빨리 도착하니까...편하게 온라인으로 주문!",
  },

  7: {
    title: "여름 휴가 2주 전, 끝내주는 여름 휴가를 위해 나는",
    type: "JP",
    A: "'첫째 날에는 여기에서 저녁 먹고, 숙소 가서...'세세하게 일정을 짠다.",
    B: "아직도 여행지만 정해둔 상태...핫플만 간간히 찾아본다.",
  },
  8: {
    title: "기다리고 또 기다렸던 여름 휴가 날! 내가 휴가를 즐기는 스타일은",
    type: "EI",
    A: "비행기 정도는 타줘야 휴가지! 여기저기 가야 할 곳이 한가득...",
    B: "도심 속이나 가까운 휴가지에서 여유롭게 호캉스를 즐긴다.",
  },
  9: {
    title: "건강도 챙길 겸 운동이나 시작해 볼까? 내가 등록할 곳은",
    type: "JP",
    A: "사물함 무료 이용 혜택을 제공하는 곳",
    B: "요새 유행하는 운동 프로그램이 있는 곳",
  },

  10: {
    title: "모처럼 쉬는 날 나는",
    type: "EI",
    A: "집에만 있으면 답답해...집을 벗어나 진정한 자유를 누린다!",
    B: "집에 있어야 에너지가 충전되지! 집밖으로는 한 발자국도 안나간다.",
  },
  11: {
    title: "마음에 쏙 드는 아이템을 발견했는데...두 브랜드 중 나의 선택은?",
    type: "TF",
    A: "나의 취향에 딱 맞는 평소 좋아하는 브랜드",
    B: "친환경 소재로 제작해 판매하는 브랜드",
  },
  12: {
    title:
      "어느새 훌쩍 다가온 연말! 올해를 완벽하게 마무리하기 위한 나의 연말파티는...",
    type: "JP",
    A: "깔끔하고 넓기만 한다면 괜찮! 특가 진행중인 장소 예약",
    B: "연말파티의 인생샷을 남겨야지! SNS에서 핫한 장소 예약",
  },
};

var result = {
  ESTJ: { explain: "자기관리 마스터" },
  ESFJ: { explain: "센스있는 모험가" },
  ENFJ: { explain: "소문난 AI 비서" },
  ENTJ: { explain: "무결점 매니저" },
  ESTP: { explain: "홍대병 힙스터" },
  ESFP: { explain: "본투비 아이돌" },
  ENFP: { explain: "FLEX 요정" },
  ENTP: { explain: "질주본능 라이더" },
  ISTP: { explain: "술세권 쇼퍼홀릭" },
  ISFP: { explain: "힙한 마음 부자" },
  INFP: { explain: "방구석 인플루언서" },
  INTP: { explain: "트렌드 얼리어답터" },
  ISTJ: { explain: "우리 동네 단호박" },
  ISFJ: { explain: "섬세한 인간 신호등" },
  INFJ: { explain: "소신 있는 엘리트" },
  INTJ: { explain: "이불 속 쇼핑 천재" },
};

const startBtn = () => {
  $(".start").hide();
  $(".quiz").show();
  next();
};

const goHome = () => {
  window.location.href = "/home";
};

const clickA = () => {
  var type = $("#type").val();
  var preValue = $("#" + type).val();
  $("#" + type).val(parseInt(preValue) + 1);
  next();
};

const clickB = () => {
  next();
};

const next = () => {
  if (now == 13) {
    $(".quiz").hide();
    $(".result").show();
    // 결과 로직
    var card = "";
    $("#EI").val() > 2 ? (card += "E") : (card += "I");
    $("#SN").val() > 2 ? (card += "S") : (card += "N");
    $("#TF").val() > 2 ? (card += "T") : (card += "F");
    $("#JP").val() > 2 ? (card += "J") : (card += "P");
    $("#mbti").html(card);
    $("#result-content").html(result[card]["explain"]);
  } else {
    $(".progress-bar").attr("style", "width: calc(100/12*" + now + "%)");
    $("#title").html(q[now]["title"]);
    $("#type").val(q[now]["type"]);
    $("#A").html(q[now]["A"]);
    $("#B").html(q[now]["B"]);
    now++;
  }
};

function QuizMain(props) {
  useEffect(() => {
    AOS.init();
  });
  return (
    <div
      className="quiz-container"
      style={{ background: "url(/img/hero-bg.png", backgroundSize: "cover" }}
    >
      <Header />
      <QuizStart />
      <QuizContent />
      <QuizResult />
      <input type="hidden" id="EI" value="0" />
      <input type="hidden" id="SN" value="0" />
      <input type="hidden" id="TF" value="0" />
      <input type="hidden" id="JP" value="0" />
    </div>
  );
}

const QuizStart = () => {
  return (
    <div className="start">
      <h1 data-aos="fade-up">나의 소비 습관 MBTI는?</h1>
      <h2 data-aos="fade-up">
        재미로 알아보는 나의 소비 MBTI 그리고 카드 추천까지!
      </h2>
      <button onClick={startBtn} className="startBtn">
        테스트 시작
      </button>
      <button onClick={goHome} className="goHomeBtn">
        홈페이지
      </button>
      <div data-aos="zoom-out" data-aos-delay="200">
        <img src="/img/hero-img.png" class="img-fluid" alt="" />
      </div>
    </div>
  );
};

const QuizContent = () => {
  return (
    <div className="quiz">
      <h1 id="title">문제</h1>
      <div className="answer">
        <input type="hidden" id="type" value="EI" />
        <button id="A" type="button" onClick={clickA}></button>
        <br />
        <button id="B" type="button" onClick={clickB}></button>
      </div>
    </div>
  );
};

const QuizResult = () => {
  return (
    <div className="result">
      <h1 id="mbti">결과</h1>
      <p>나의 소비 습관은...</p>
      <div>
        <p id="result-content"></p>
      </div>
      <button onClick={goHome} className="goHomeBtn">
        홈페이지
      </button>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="/img/logo.png" alt="" />
        </a>
      </div>
    </header>
  );
};

export default QuizMain;
