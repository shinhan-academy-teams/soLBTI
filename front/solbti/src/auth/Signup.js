import { Alert, Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const navi = useNavigate();

  const [member, setMember] = useState({
    memId: "",
    memPwd: "",
    memName: "",
    memEmail: "",
    memAddr: "",
    memPhone: "",
    memPwdConfirm: "",
  });

  const [isValid, setIsValid] = useState({
    memId: true,
    memPwd: true,
    memName: true,
    memEmail: true,
    memAddr: true,
    memPhone: true,
    emailDup: true,
    idDup: true,
    phonNumDup: true,
    memPwdConfirm: true,
  });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: e.target.value !== "" });
    if (e.target.name === "memEmail")
      setIsValid({ ...isValid, emailDup: true });
    if (e.target.name === "memId") setIsValid({ ...isValid, idDup: true });
    if (e.target.name === "memPhone")
      setIsValid({ ...isValid, phonNumDup: true });
  };

  const handleSubmit = () => {
    if (
      member.memId === "" ||
      member.memPwd === "" ||
      member.memName === "" ||
      member.memEmail === "" ||
      member.memAddr === "" ||
      member.memPhone === ""
    ) {
      // 유효성 검사 실패: 값이 비어 있음
      setIsValid({
        memId: member.memId !== "",
        memPwd: member.memPwd !== "",
        memName: member.memName !== "",
        memEmail: member.memEmail !== "",
        memAddr: member.memAddr !== "",
        memPhone: member.memPhone !== "",
      });
      alert("모두 입력하세요");
      return;
    }
    if (isValid.idDup === true) {
      alert("Id 중복체크하세요");
      return;
    }
    if (isValid.emailDup === true) {
      alert("email 중복체크하세요");
      return;
    }

    if (isValid.phonNumDup === true) {
      alert("전화번호 중복체크하세요");
      return;
    }
    if (member.memPwd !== member.memPwdConfirm) {
      alert("비밀번호가 일치하지 않아요");
      return;
    }

    // 유효성 검사 통과
    // 로그인 처리 로직 작성

    axios({
      url: "/auth/signup",
      method: "post",
      data: member,
    })
      .then((responseData) => {
        console.log(responseData.data);
        if (responseData.data == "signup success") {
          navi("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 유효성 검사
  const emailDupCheck = () => {
    axios({
      url: "/auth/isValidEmail",
      method: "post",
      data: member,
    })
      .then((responseData) => {
        console.log(responseData.data);
        if (responseData.data == true) {
          alert("사용 가능한 이메일");
          setIsValid({ ...isValid, emailDup: false });
        } else {
          alert("중복된 email");
          setIsValid({ ...isValid, emailDup: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const idDupCheck = () => {
    axios({
      url: "/auth/isValidId",
      method: "post",
      data: member,
    })
      .then((responseData) => {
        console.log(responseData.data);
        if (responseData.data == true) {
          alert("사용 가능한 아이디");
          setIsValid({ ...isValid, idDup: false });
        } else {
          alert("중복된 아이디");
          setIsValid({ ...isValid, idDup: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const phoneDupCheck = () => {
    axios({
      url: "/auth/isValidPhone",
      method: "post",
      data: member,
    })
      .then((responseData) => {
        console.log(responseData.data);
        if (responseData.data == true) {
          alert("사용 가능한 전화번호");
          setIsValid({ ...isValid, phonNumDup: false });
        } else {
          alert("이미 가입된 전화번호가 있습니다.");
          setIsValid({ ...isValid, phonNumDup: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //주소입력
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setMember((prevMember) => ({
      ...prevMember,
      memAddr: fullAddress,
    }));

    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      memAddr: fullAddress !== "",
    }));
  };

  return (
    <Container maxWidth="sm">
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
            label="ID"
            error={!isValid.memId}
            helperText={!isValid.memId ? "필수입니다." : ""}
            onChange={handleChange}
          />
          <Button onClick={idDupCheck}>중복 확인</Button>
          <p>{isValid.idDup ? "아이디 중복여부 체크하세요" : ""}</p>
        </div>
        <div>
          <TextField
            required
            name="memPwd"
            label="비밀번호"
            type="password"
            error={!isValid.memPwd}
            helperText={!isValid.memPwd ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            name="memPwdConfirm"
            label="비밀번호 확인"
            type="password"
            error={!isValid.memPwdConfirm}
            helperText={!isValid.memPwdConfirm ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            name="memName"
            label="이름"
            error={!isValid.memName}
            helperText={!isValid.memName ? "필수입니다." : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            name="memEmail"
            label="e-mail"
            type="email"
            error={!isValid.memEmail}
            helperText={!isValid.memEmail ? "필수입니다." : ""}
            onChange={handleChange}
          />
          <Button onClick={emailDupCheck}>중복 확인</Button>
          <p>{isValid.emailDup ? "이메일 중복여부 체크하세요" : ""}</p>
        </div>
        <div>
          {/* <TextField id="sample6_postcode" />
          <Button onclick={sample6_execDaumPostcode} /> */}
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
          <TextField aria-readonly value={member.memAddr} />
        </div>
        <div>
          {/*-표시 아직 안나옴 */}
          <TextField
            required
            name="memPhone"
            label="전화번호"
            error={!isValid.memPhone}
            helperText={!isValid.memPhone ? "필수입니다." : ""}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
          <Button onClick={phoneDupCheck}>중복 확인</Button>
          <p>{isValid.phonNumDup ? "전화번호 중복여부 체크하세요" : ""}</p>
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
