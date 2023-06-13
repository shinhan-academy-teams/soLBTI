import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";
import CardListHome from "componenet/CardListHome";
import MyCardList from "mypage/MyCardList";
import Myinfo from "mypage/Myinfo";
import CardDetail from "componenet/CardDetail";
import JoinCard from "componenet/JoinCard";
import MyPage from "mypage/MyPage";
import MyCardDetail from "mypage/MyCardDetail";
import PaymentList from "mypage/PaymentList";
import JwtTokenTest from "auth/JwtTokenTest";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";
import QuizMain from "quiz/QuizMain";

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
          <Route path="analyze" element={<PaymentList />} />
        </Route>
        {/* card */}
        <Route path="/cardlist" element={<CardListHome />} />
        <Route path="/cardlist/detail/:cno" element={<CardDetail />} />
        <Route path="/cardlist/join/:cno" element={<JoinCard />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
