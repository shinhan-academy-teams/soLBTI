import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "memId",
  ]);
  const navi = useNavigate();

  const [member, setMember] = useState({ memId: "", memPwd: "" });
  const [isValid, setIsValid] = useState({ memId: true, memPwd: true });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: e.target.value !== "" });
  };

  const handleSubmit = () => {
    if (member.memId === "" || member.memPwd === "") {
      // 유효성 검사 실패: 값이 비어 있음
      setIsValid({
        memId: member.memId !== "",
        memPwd: member.memPwd !== "",
      });
      return;
    }

    // 유효성 검사 통과
    // 로그인 처리 로직 작성

    axios({
      url: "/api/auth/login",
      method: "post",
      data: member,
    })
      .then((responseData) => {
        if (responseData.data) {
          // localStorage.setItem("accessToken", responseData.data.data.token);
          // console.log(responseData.data);

          setCookie("accessToken", responseData.data.data.token, { path: "/" });
          setCookie("memCode", responseData.data.data.memCode, { path: "/" });
          //setMemCode(responseData.data.data.memCode);

          navi(-1);
        } else {
          alert("로그인 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <p>로그인 컴포넌트</p>
      <p>{member.memId}</p>
      <p>{member.memPwd}</p>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            name="memId"
            // className="outlined-required"
            label="ID"
            error={!isValid.memId}
            helperText={!isValid.memId ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            error={!isValid.memPwd}
            name="memPwd"
            // className="outlined-required"
            label="password"
            type="password"
            helperText={!isValid.memPwd ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <Button variant="outlined" onClick={handleSubmit}>
          로그인
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
