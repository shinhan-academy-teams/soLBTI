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
import { CookiesProvider } from "react-cookie";
import QuizMain from "quiz/QuizMain";
import PaymentApp from "mypage/PaymentApp";
import CardChart from "componenet/CardChart";
import PaymentMethod from "mypage/PaymentMethod";
import SendSms from "sms/SendSms";
import CheckLogin from "auth/CheckLogin";
import ChatGPTComponent from "comtents/ChatGPTComponent";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = CheckLogin();

  return isAuthenticated ? element : <Navigate to="/auth/login" />;
};

function App() {
  return (
    <CookiesProvider>
      <Routes>
        {/* main */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<QuizMain />}></Route>
        <Route path="/home" element={<Home />} />
        {/* login, signup */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* mypage */}
        <Route path="/mypage" element={<MyPage />}>
          <Route
            path="cards"
            element={<PrivateRoute element={<MyCardList />} />}
          />
          <Route
            path="4"
            element={<PrivateRoute element={<MyCardDetail />} />}
          />
          <Route path="info" element={<PrivateRoute element={<Myinfo />} />} />

          <Route
            path="analyze"
            element={<PrivateRoute element={<PaymentApp />} />}
          />
        </Route>
        {/* card */}
        <Route path="/cardlist" element={<CardListHome />} />
        <Route path="/cardlist/detail/:cno" element={<CardDetail />} />
        {/* join card */}
        <Route
          path="/cardlist/join/:cno"
          element={<PrivateRoute element={<MyInfoCheck />} />}
        />
        <Route path="/cardlist/writemyinfo/:cno" element={<WriteMyInfo />} />
        <Route path="/cardlist/agree" element={<CardAgree></CardAgree>} />
        <Route path="/cardlist/paymentMethod" element={<PaymentMethod />} />
        <Route path="/cardlist/sms/send" element={<SendSms />} />
        {/* card chart */}
        <Route path="/chart" element={<CardChart />} />
        {/* 다른 페이지 라우트 정의 */}
        <Route path="/chat" element={<ChatGPTComponent />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
