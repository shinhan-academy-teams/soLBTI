import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

function JwtTokenTest(props) {
  const handleSubmit = () => {
    const accessToken = localStorage.getItem("accessToken");

    axios({
      url: "/checktoken",
      method: "get",
      headers: { Authorization: `Bearer ${accessToken}` },
      data: accessToken,
    })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fakeTokenSubmit = () => {
    axios({
      url: "/checktoken",
      method: "get",
      headers: {
        Authorization: `Bearer fakeTokenasdfasdfasdfasdfasdfasdfasdf}`,
      },
    })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const tokenDelete = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <div>
      <Button onClick={handleSubmit}>토큰 전송</Button>
      <Button onClick={fakeTokenSubmit}>가짜 토큰 전송</Button>
      <Button onClick={tokenDelete}>토큰 삭제</Button>
    </div>
  );
}

export default JwtTokenTest;
