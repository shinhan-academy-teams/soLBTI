import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "common/Header";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";
import Graphcomponent from "mypage/Graphcomponent";
import MoneyGraphComponent from "mypage/MoneyGraphComponent";
import CardListHome from "componenet/CardListHome";

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
          <Route path="1" element={<Graphcomponent />} />
        </Route>
        <Route path="/cardlist" element={<CardListHome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
