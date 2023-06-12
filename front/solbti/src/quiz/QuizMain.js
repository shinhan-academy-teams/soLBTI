import React, { useState } from "react";
import "./quizMain.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import BounceLoader from "react-spinners/BounceLoader";

var now = 1;
// 질문지
var q = {
  1: {
    title: "오늘은 기다리던 나의 월급날💰! 돈이 생긴 후 나는...",
    type: "JP",
    A: "이번 달 용돈은 20만 원만.. 통신비 3만 원.. <br/> 미리 세워둔 계획에 따라 분배한다!",
    B: "저번에 찜 해놨던 옷..👚 신발..👟<br/> 우선 사고 싶었던 것들부터 결제한다!",
  },
  2: {
    title: "여유로운 휴일, 평소에 보고 싶었던 영화🎬를 보려고 한다...",
    type: "SN",
    A: "영화관의 조명.. 온도.. 습도.. 직접 가서 봐야 제맛이지!🍿",
    B: "요즘 넷○릭스가 얼마나 편한데.. OTT 플랫폼으로 본다.💻",
  },
  3: {
    title: "하늘🌠에서 100만 원이 뚝 떨어졌다?! 돈이 생긴 나는..",
    type: "TF",
    A: "평소에 사려던 물건 바로 flex💲! 나를 위한 소비를 한다.",
    B: "꽁돈도 생겼겠다.. 고마웠던 친구들에게 작은 선물🎁을 해준다.",
  },

  4: {
    title: "새롭게 찾아온 계절🍂 기분전환 겸 옷장을 좀 채워볼까...",
    type: "SN",
    A: "입어보지 않으면 가늠하기 어려워!<br/> 매장에서 직접 보고 구매한다.",
    B: "내가 입으면 대충 이런 느낌이겠는데?<br/> 쇼핑 앱에서 마음에 드는 옷 구매!",
  },
  5: {
    title: "내가 만약 야구광이라면⚾야구 경기를 보기 위해...",
    type: "EI",
    A: "거리가 좀 멀어도 OK! 사람들과 치맥 하면서 경기 직관해야지~",
    B: "사람 많은 곳은 기 빨려... 그냥 집에서 스포티비로 중계 시청!",
  },
  6: {
    title: "프로자취러인 나! 생필품🪥🧼이 슬슬 바닥을 보이기 시작했다.",
    type: "SN",
    A: "장은 직접 보는 게 낫지! 자주 가는 마트로 출발🛒",
    B: "굳이 보고 살 필요가 있나? 편하게 온라인으로 주문!📱",
  },

  7: {
    title: "친구들과의 여행을 앞두고 있다✈️ 나의 여행 계획 스타일은?",
    type: "JP",
    A: "계획이 꼼꼼해야 불필요한 지출을 막을 수 있지!<br/> 계획과 예산을 짜둔다.",
    B: "계획? 예산? 그게 뭔데... 그냥 핫플레이스로 떠나는 거야~😎",
  },
  8: {
    title: "드디어 찾아온 여름휴가⛱️ 나는 이번 휴가 때...",
    type: "EI",
    A: "당연히 해외여행! 비행기 정도는 타줘야 제대로 된 휴가지!",
    B: "가까운 도심 속에서.. 여유롭게 즐기는 호캉스가 최고야🏨",
  },
  9: {
    title:
      "누워서 폰으로 이것저것 구경하던 중...🛏️<br/> 필요하진 않지만 마음에 드는 물건을 발견했다!",
    type: "JP",
    A: "갑작스럽고 불필요한 지출은 NO! 아쉽지만 구매하지는 않는다.",
    B: "이거 그냥 내 건데? 당장 사야겠는데? 바로 구매를 갈겨버린다.",
  },

  10: {
    title: "갑작스럽게 하루 쉬는 날이 생겨버렸다!",
    type: "EI",
    A: "모처럼 휴일인데.. 집 밖에 나가 쇼핑도 하고 친구도 만나자!🤼",
    B: "나의 배터리는 집에 있어야만 충전돼.. 집콕을 즐긴다🏡",
  },
  11: {
    title: "플리마켓을 지나가던 중, 나의 눈길👀을 더 사로잡는 아이템은?",
    type: "TF",
    A: "내가 평소에 필요했던 취향 저격 아이템✨",
    B: "친환경🍃 소재로 제작해 좋은 의미가 담긴 아이템",
  },
  12: {
    title: "연말 파티🎉를 위한 장소를 예약하려고 한다...",
    type: "TF",
    A: "깔끔하기만 하면 돼! 합리적인 가격이 우선이지👏",
    B: "가성비는 따지지 말자~ 분위기💗 좋은 장소로 선택해야지",
  },
};

// 결과지
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
      <ProgressBar striped variant="info" animated now={0} className="pg-bar" />
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
  const [loading, setLoading] = useState(true);
  return (
    <div className="result">
      {loading && <BounceLoader color="#36d7b7" className="loader" />}
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
