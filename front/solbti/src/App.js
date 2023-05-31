import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "common/Header";
import Home from "home/Home";
import Graphcomponent from "mypage/Graphcomponent";
import MoneyGraphComponent from "mypage/MoneyGraphComponent";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
