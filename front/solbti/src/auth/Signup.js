import { Box, Button, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleAuthCodeChange = (e) => {
    setAuthCode(e.target.value);
  };

  const handleRequestCode = async (e) => {
    try {
      const response = await axios.post("/user/request-sms", { phoneNumber });
      setIsCodeRequested(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyCode = async (e) => {
    try {
      const response = await axios.post("/user/verify-sms", {
        phoneNumber,
        authCode,
      });
      setIsCodeVerified(true);
    } catch (error) {
      console.log(error);
      alert("인증 실패!");
    }
  };
  const navi = useNavigate();

  const [member, setMember] = useState({
    memId: "",
    memPwd: "",
    memName: "",
    memEmail: "",
    memAddr: "",
    memPhone: "",
    memPwdConfirm: "",
    memBirth: "",
    memGender: "",
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
    memBirth: true,
    memGender: true,
  });

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
    setIsValid({ ...isValid, [e.target.name]: e.target.value !== "" });
    if (e.target.name === "memEmail")
      setIsValid({
        ...isValid,
        emailDup: true,
        [e.target.name]: e.target.value !== "",
      });
    if (e.target.name === "memId") {
      setIsValid({
        ...isValid,
        idDup: true,
        [e.target.name]: e.target.value !== "",
      });
    }
    if (e.target.name === "memPhone") {
      setPhoneNumber(e.target.value);
    }
    if (e.target.name === "memGender") {
      if (e.target.value % 2 == "1") {
        setMember({ ...member, memGender: "M" });
      } else setMember({ ...member, memGender: "F" });
    }
  };

  const handleSubmit = () => {
    if (
      member.memId === "" ||
      member.memPwd === "" ||
      member.memName === "" ||
      member.memEmail === "" ||
      member.memAddr === "" ||
      member.memPhone === "" ||
      member.memGender === "" ||
      member.memBirth === ""
    ) {
      // 유효성 검사 실패: 값이 비어 있음
      setIsValid({
        memId: member.memId !== "",
        memPwd: member.memPwd !== "",
        memName: member.memName !== "",
        memEmail: member.memEmail !== "",
        memAddr: member.memAddr !== "",
        memPhone: member.memPhone !== "",
        memBirth: member.memBirth !== "",
        memGender: member.memGender !== "",
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

    if (!isCodeVerified) {
      alert("전화번호를 인증해주세요.");
      return;
    }
    if (member.memPwd !== member.memPwdConfirm) {
      alert("비밀번호가 일치하지 않아요");
      return;
    }

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

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

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
    //console.log(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <Container maxWidth="sm" className="loginContainer">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <p>{member.memAddr}</p>
        <p>{member.memEmail}</p>
        <p>{member.memGender}</p>
        <p>{member.memId}</p>
        <p>{member.memName}</p>
        <p>{member.memPhone}</p>
        <p>{member.memPwd}</p>
        <p>{member.memPwdConfirm}</p>
        <p>{member.memBirth}</p> */}
        <h1 className="margin-bottom-50"> 회원가입 </h1>
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

        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            style={{ width: "150px" }}
            required
            name="memBirth"
            label="주민등록번호"
            error={!isValid.memBirth}
            helperText={!isValid.memBirth ? "필수입니다." : ""}
            onChange={handleChange}
          />
          <span style={{ fontSize: "20px" }}>-</span>
          <TextField
            style={{ width: "50px" }}
            name="memGender"
            required
            error={!isValid.memGender}
            helperText={!isValid.memGender ? " " : ""}
            onChange={handleChange}
          />
          <span span style={{ fontSize: "20px" }}>
            ●●●●●●
          </span>
        </div>
        <div>
          {/* <SendSms></SendSms> */}
          <TextField
            required
            name="memPhone"
            label="전화번호"
            type="text"
            disabled={isCodeVerified}
            value={member.memPhone}
            error={!isValid.memPhone}
            helperText={!isValid.memPhone ? "필수입니다." : ""}
            onChange={handleChange}
          />
          <Button onClick={(phoneDupCheck, handleRequestCode)}>
            전화번호 인증
          </Button>
          {/* <p>{isValid.phonNumDup ? "" : ""}</p> */}
        </div>
        {isCodeRequested && (
          <div>
            <div>
              <TextField
                type="text"
                value={authCode}
                onChange={handleAuthCodeChange}
              />
              <Button onClick={handleVerifyCode}>인증하기</Button>
            </div>
            {isCodeVerified ? "인증이 완료되었습니다." : "전화번호 인증하세요"}
          </div>
        )}
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
          {/* <p>{member.memAddr}</p> */}
          {/* <TextField id="sample6_postcode" />
          <Button onclick={sample6_execDaumPostcode} /> */}
          {/* <DaumPostcodeEmbed onComplete={handleComplete} {...props} /> */}
          <TextField aria-readonly value={member.memAddr} />

          <Button type="button" onClick={handleClick}>
            주소 찾기
          </Button>
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
