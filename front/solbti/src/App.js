import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";
import CardListHome from "componenet/CardListHome";
import MyCardList from "mypage/MyCardList";
import Myinfo from "mypage/Myinfo";
import CardDetail from "componenet/CardDetail";
import MyPage from "mypage/MyPage";
import MyCardDetail from "mypage/MyCardDetail";
import CardAgree from "componenet/CardAgree";
import WriteMyInfo from "componenet/WriteMyInfo";
import MyInfoCheck from "componenet/MyInfoCheck";
import MyInfoAuth from "componenet/MyInfoAuth";
import JwtTokenTest from "auth/JwtTokenTest";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import QuizMain from "quiz/QuizMain";
import PaymentApp from "mypage/PaymentApp";
import ContentsApp from "comtents/ContentsApp";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "memId",
  ]);

  return (
    <CookiesProvider>
      <Routes>
        {/* main */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<QuizMain />} />
        <Route path="/home" element={<Home />} />
        {/* login, signup */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="test" element={<JwtTokenTest />} />
        </Route>
        {/* mypage */}
        <Route path="/mypage">
          <Route path="0" element={<MyPage />} />
          <Route path="cards" element={<MyCardList />} />
          <Route path="4" element={<MyCardDetail />} />
          <Route path="info" element={<Myinfo />} />
          <Route path="analyze" element={<PaymentApp />} />
        </Route>
        {/* card */}
        <Route path="/cardlist" element={<CardListHome />} />
        <Route path="/cardlist/detail/:cno" element={<CardDetail />} />
        <Route path="/cardlist/myinfoauth" element={<MyInfoAuth />} />
        <Route path="/cardlist/join/:cno" element={<MyInfoCheck />} />
        <Route path="/cardlist/writemyinfo/:cno" element={<WriteMyInfo />} />
        <Route path="/cardlist/agree" element={<CardAgree></CardAgree>} />
        {/* contents */}
        <Route path="/contents" element={<ContentsApp />}></Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
