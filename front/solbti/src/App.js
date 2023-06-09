import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";
import Graphcomponent from "mypage/Graphcomponent";
import MyCardList from "mypage/MyCardList";
import Myinfo from "mypage/Myinfo";
import CardListHome from "componenet/CardListHome";
import MyCardList from "mypage/MyCardList";
import Myinfo from "mypage/Myinfo";

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

          <Route path="cards" element={<MyCardList />} />
          <Route path="analyze" element={<Graphcomponent />} />
          <Route path="info" element={<Myinfo />} />

        </Route>
        <Route path="/cardlist" element={<CardListHome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
