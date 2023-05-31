import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "common/Header";
import Home from "home/Home";
import Login from "auth/Login";
import Signup from "auth/Signup";

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
