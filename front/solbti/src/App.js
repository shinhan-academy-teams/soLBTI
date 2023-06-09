import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";
import Graphcomponent from "mypage/Graphcomponent";
import CardListHome from "componenet/CardListHome";
import MyCardList from "mypage/MyCardList";
import Myinfo from "mypage/Myinfo";
import CardDetail from "componenet/CardDetail";
import JoinCard from "componenet/JoinCard";
import MyPage from "mypage/MyPage";
import MyCardDetail from "mypage/MyCardDetail";
import PaymentList from "mypage/PaymentList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/mypage">
          <Route path="0" element={<MyPage />} />
          <Route path="cards" element={<MyCardList />} />
          <Route path="4" element={<MyCardDetail />} />
          <Route path="info" element={<Myinfo />} />
          <Route path="analyze" element={<PaymentList />} />
        </Route>
        <Route path="/cardlist" element={<CardListHome />} />
        <Route path="/cardlist/detail/:cno" element={<CardDetail />} />
        <Route path="/cardlist/join/:cno" element={<JoinCard />} />
      </Routes>
    </div>
  );
}

export default App;
