import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "common/Header";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";
import Graphcomponent from "mypage/Graphcomponent";
import CardListHome from "componenet/CardListHome";
import JwtTokenTest from "auth/JwtTokenTest";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "memId",
  ]);

  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="test" element={<JwtTokenTest />} />
        </Route>
        <Route path="/mypage">
          <Route path="1" element={<Graphcomponent />} />
        </Route>
        <Route path="/cardlist" element={<CardListHome />}></Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
