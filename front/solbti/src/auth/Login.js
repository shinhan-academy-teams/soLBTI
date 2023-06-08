import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [member, setMember] = useState({ memId: "", memPwd: "" });
  const [isValid, setIsValid] = useState({ memId: true, memPwd: true });
  const navi = useNavigate();

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
      url: "/auth/login",
      method: "post",
      data: member,
    })
      .then((responseData) => {
        console.log(responseData.data);
        navi("/");
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
