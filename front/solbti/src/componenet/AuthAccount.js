import axios from "axios";
import React, { useEffect, useState } from "react";

function AuthAccount(props) {
  const [account, setAccount] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleVerificationSubmit = async (e) => {
    //e.preventDefault();

    setAccount({ ...account, [e.target.name]: e.target.value });

    // axios({
    //   method: "post",
    //   url: "/verify-account", //주소 형식과 맞춰줌
    //   data: account,
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      //Open Banking API 호출
      //springboot에 api가 있으므로 스프링부트 주소를 호출해야하는게 아닌가요
      const response = await axios.post(
        "https://openapi.openbanking.or.kr/v2.0/inquiry/real_namet",
        {
          params: {
            accountNumber: accountNumber,
          },
        }
      );

      // API 응답 결과 확인
      if (response.data.success) {
        setVerificationResult("Account verified successfully.");
        console.log("Success");
      } else {
        setVerificationResult("Account verification failed.");
      }
    } catch (error) {
      console.error("Error during account verification:", error);
      setVerificationResult("An error occurred during account verification.");
    }
  };
  handleVerificationSubmit();
}

export default AuthAccount;
