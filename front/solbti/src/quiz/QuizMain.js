import React, { useState } from "react";
import "./quizMain.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import BounceLoader from "react-spinners/BounceLoader";
import cookies from "react-cookies";

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
  // 3: {
  //   title: "하늘🌠에서 100만 원이 뚝 떨어졌다?! 돈이 생긴 나는..",
  //   type: "TF",
  //   A: "평소에 사려던 물건 바로 flex💲! 나를 위한 소비를 한다.",
  //   B: "꽁돈도 생겼겠다.. 고마웠던 친구들에게 작은 선물🎁을 해준다.",
  // },

  3: {
    title: "새롭게 찾아온 계절🍂 기분전환 겸 옷장을 좀 채워볼까...",
    type: "SN",
    A: "입어보지 않으면 가늠하기 어려워!<br/> 매장에서 직접 보고 구매한다.",
    B: "내가 입으면 대충 이런 느낌이겠는데?<br/> 쇼핑 앱에서 마음에 드는 옷 구매!",
  },
  4: {
    title: "내가 만약 야구광이라면⚾야구 경기를 보기 위해...",
    type: "EI",
    A: "거리가 좀 멀어도 OK! 사람들과 치맥 하면서 경기 직관해야지~",
    B: "사람 많은 곳은 기 빨려... 그냥 집에서 스포티비로 중계 시청!",
  },
  5: {
    title: "프로자취러인 나! 생필품🪥🧼이 슬슬 바닥을 보이기 시작했다.",
    type: "SN",
    A: "장은 직접 보는 게 낫지! 자주 가는 마트로 출발🛒",
    B: "굳이 보고 살 필요가 있나? 편하게 온라인으로 주문!📱",
  },

  6: {
    title: "친구들과의 여행을 앞두고 있다✈️ 나의 여행 계획 스타일은?",
    type: "JP",
    A: "계획이 꼼꼼해야 불필요한 지출을 막을 수 있지!<br/> 계획과 예산을 짜둔다.",
    B: "계획? 예산? 그게 뭔데... 그냥 핫플레이스로 떠나는 거야~😎",
  },
  7: {
    title: "드디어 찾아온 여름휴가⛱️ 나는 이번 휴가 때...",
    type: "EI",
    A: "당연히 해외여행! 비행기 정도는 타줘야 제대로 된 휴가지!",
    B: "가까운 도심 속에서.. 여유롭게 즐기는 호캉스가 최고야🏨",
  },
  8: {
    title:
      "누워서 폰으로 이것저것 구경하던 중...🛏️<br/> 필요하진 않지만 마음에 드는 물건을 발견했다!",
    type: "JP",
    A: "갑작스럽고 불필요한 지출은 NO! 아쉽지만 구매하지는 않는다.",
    B: "이거 그냥 내 건데? 당장 사야겠는데? 바로 구매를 갈겨버린다.",
  },

  9: {
    title: "갑작스럽게 하루 쉬는 날이 생겨버렸다!",
    type: "EI",
    A: "모처럼 휴일인데.. 집 밖에 나가 쇼핑도 하고 친구도 만나자!🤼",
    B: "나의 배터리는 집에 있어야만 충전돼.. 집콕을 즐긴다🏡",
  },
  // 11: {
  //   title: "플리마켓을 지나가던 중, 나의 눈길👀을 더 사로잡는 아이템은?",
  //   type: "TF",
  //   A: "내가 평소에 필요했던 취향 저격 아이템✨",
  //   B: "친환경🍃 소재로 제작해 좋은 의미가 담긴 아이템",
  // },
  // 12: {
  //   title: "연말 파티🎉를 위한 장소를 예약하려고 한다...",
  //   type: "TF",
  //   A: "깔끔하기만 하면 돼! 합리적인 가격이 우선이지👏",
  //   B: "가성비는 따지지 말자~ 분위기💗 좋은 장소로 선택해야지",
  // },
};

// 결과지
var result = {
  ESJ: {
    name: "섬세한 탐험가",
    explain:
      "섬세한 탐험가는 외출하며 다양한 활동을 즐기는 동시에 계획적으로 소비를 관리하는 사람들입니다.<br/> 자신의 시간과 예산을 잘 조율하여 오프라인 활동을 계획하고 이를 즐기는데 열성적이에요.<br/>사전에 탐색과 조사를 통해 최적의 활동을 계획하고 효율적인 소비를 추구합니다.",
  },
  ENJ: {
    name: "인싸 플래너",
    explain:
      "인싸 플래너는 다양한 활동과 구매를 사전에 계획하고 소비하는 경향이 있습니다.<br/>여기저기 돌아다니는 것도 좋아해서 소비 활동 범위도 넓어요.<br/> 온라인에서 할인, 프로모션, 이벤트 등을 적극 활용하여 효율적으로 소비하는 것을 즐깁니다.",
  },
  ESP: {
    name: "부지런한 어드밴처 쇼퍼",
    explain:
      "부지런한 어드밴처 쇼퍼는 온라인 쇼핑보다 구경할 게 많은 오프라인 쇼핑을 더 좋아해요.<br/> 새로운 경험과 놀라움을 찾아 소비하는데 있어서 즉흥적이고 모험적인 성향을 가지고 있습니다.<br/> 기분이 좋을 때 계획에 없던 소비를 하기도 해요.",
  },
  ENP: {
    name: "디지털 아드레날린러",
    explain:
      "디지털 아드레날린러는 활발하게 활동하며 온라인 플랫폼에서 즉흥적으로 소비해요.<br/> 신나는 경험과 스릴을 추구하며 온라인 쇼핑, 엔터테인먼트, 여행 등 <br/>다양한 온/오프라인 활동을 통해 즐거움과 도전을 찾는 경향이 있습니다.",
  },
  ISP: {
    name: "로컬 유람자",
    explain:
      "로컬 유람자의 주된 소비 활동지는 집 주변입니다.<br/>여행도 너무 먼 곳보다는 가까운 곳을 더 선호해요.<br/> 근거리에 있는 다양한 장소나 행사를 탐색하며, 오프라인 환경에서 즉흥적인 소비를 즐깁니다.",
  },
  INP: {
    name: "디지털 스파이더",
    explain:
      "디지털 스파이더는 오프라인 쇼핑보다는 온라인 쇼핑이 더 잘맞아요. <br/> 디지털 환경에서 즉흥적인 소비를 하는 사람들이 이 유형에 속합니다.<br/> 온라인 구독 서비스도 많이 이용하는 편이에요. 은근 유행에 민감해서 요즘 뜨는 맛집, 핫플 트렌드를 파악하고 있습니다.",
  },
  ISJ: {
    name: "우리동네 소비요정",
    explain:
      "우리동네 소비요정의 주 활동지는 집 주변이에요.<br/> 근거리에 위치한 다양한 장소를 방문하며 시간을 보내곤 합니다.<br/>소비 관리는 무조건 계획적으로, 꼼꼼하게. <br/>장 볼 때도 미리 리스트를 정리해서 필요한 것만 사고 와요.",
  },
  INJ: {
    name: "꼼꼼한 방구석 쇼퍼",
    explain:
      "아늑한 이불 속에서 찐 행복을 느끼는 꼼꼼한 방구석 쇼퍼<br/> 이 유형의 사람들은 핸드폰만 있으면 쇼핑부터 문화까지 즐길 수 있어요.<br/>돈을 허투루 쓰지 않고 소비를 할 때 효율적인 계획을 세우는 특징을 갖고 있습니다.",
  },
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
  if (now === 10) {
    $(".quiz").hide();
    $(".result").show();
    // 결과 로직
    var type = "";
    $("#EI").val() > 2 ? (type += "E") : (type += "I");
    $("#SN").val() > 2 ? (type += "S") : (type += "N");
    // $("#TF").val() > 2 ? (card += "T") : (card += "F");
    $("#JP").val() > 2 ? (type += "J") : (type += "P");
    $("#mbti").html(result[type]["name"]);
    $("#result-content").html(result[type]["explain"]);
    $(".goLoginBtn").data("type", result[type]["name"]);
  } else {
    $(".progress-bar").attr("style", "width: calc(100/9*" + now + "%)");
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
      {/* <input type="hidden" id="TF" value="0" /> */}
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
  const handleGoLogin = () => {
    cookies.save("memberType", $(".goLoginBtn").data("type"));
  };

  return (
    <div className="result">
      <p>나의 소비 습관은...</p>
      <h1 id="mbti">결과</h1>
      <div>
        <p id="result-content"></p>
      </div>
      <button onClick={goHome} className="goHomeBtn">
        홈페이지
      </button>
      <button onClick={handleGoLogin} className="goLoginBtn" data-type="">
        로그인하고 내 유형 저장하기
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
