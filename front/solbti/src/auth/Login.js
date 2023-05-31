import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";

function Login(props) {
  const [member, setMember] = useState({ memberid: "", password: "" });
  const [isValid, setIsValid] = useState({ memberid: true, password: true });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: e.target.value !== "" });
  };

  const handleSubmit = () => {
    if (member.memberid === "" || member.password === "") {
      // 유효성 검사 실패: 값이 비어 있음
      setIsValid({
        memberid: member.memberid !== "",
        password: member.password !== "",
      });
      return;
    }

    // 유효성 검사 통과
    // 로그인 처리 로직 작성
  };

  return (
    <Container maxWidth="sm">
      <p>로그인페이지</p>
      <p>{member.memberid}</p>
      <p>{member.password}</p>
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
            error={!isValid.memberid}
            name="memberid"
            // className="outlined-required"
            label="ID"
            helperText={!isValid.memberid ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            error={!isValid.password}
            name="password"
            // className="outlined-required"
            label="password"
            type="password"
            helperText={!isValid.password ? "필수입니다." : ""}
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
