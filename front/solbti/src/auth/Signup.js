import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function Signup(props) {
  const [member, setMember] = useState({
    mem_id: "",
    mem_pwd: "",
    mem_name: "",
    mem_email: "",
    mem_addr: "",
    mem_phone: "",
  });

  const [isValid, setIsValid] = useState({
    mem_id: true,
    mem_pwd: true,
    mem_name: true,
    mem_email: true,
    mem_addr: true,
    mem_phone: true,
  });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: e.target.value !== "" });
  };

  const handleSubmit = () => {
    if (
      member.mem_id === "" ||
      member.mem_pwd === "" ||
      member.mem_name === "" ||
      member.mem_email === "" ||
      member.mem_addr === "" ||
      member.mem_phone === ""
    ) {
      // 유효성 검사 실패: 값이 비어 있음
      setIsValid({
        mem_id: member.mem_id !== "",
        mem_pwd: member.mem_pwd !== "",
        mem_name: member.mem_name !== "",
        mem_email: member.mem_email !== "",
        mem_addr: member.mem_addr !== "",
        mem_phone: member.mem_phone !== "",
      });
      return;
    }

    const handleAdd = (e) => {
      axios({
        url: "/auth/register",
        method: "post",
        data: member,
      })
        .then((responseData) => {
          console.log(responseData.data);
          // navi("/board/list");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // 유효성 검사 통과
    // 로그인 처리 로직 작성
  };

  return (
    <Container maxWidth="sm">
      <p>회원가입페이지</p>
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
            name="mem_id"
            label="ID"
            error={!isValid.mem_id}
            helperText={!isValid.mem_id ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            name="mem_pwd"
            label="비밀번호"
            type="password"
            error={!isValid.mem_pwd}
            helperText={!isValid.mem_pwd ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            label="비밀번호 확인"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            name="mem_name"
            label="이름"
            error={!isValid.mem_name}
            helperText={!isValid.mem_name ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            name="mem_email"
            label="e-mail"
            type="email"
            error={!isValid.mem_email}
            helperText={!isValid.mem_email ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          {/*-표시 아직 안나옴 */}
          <TextField
            required
            name="mem_phone"
            label="전화번호"
            error={!isValid.mem_phone}
            helperText={!isValid.mem_phone ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button variant="outlined" onClick={handleSubmit}>
            가입하기
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default Signup;
