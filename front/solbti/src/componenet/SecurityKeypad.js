import React, { useState, useCallback } from "react";
import "mypage/keypad.css";
import "componenet/WriteMyInfo.css";
const PASSWORD_MAX_LENGTH = 4; // 비밀번호 입력길이 제한 설정

const shuffle = (nums) => {
  // 배열 섞는 함수
  let num_length = nums.length;
  while (num_length) {
    console.log("here");
    let random_index = Math.floor(num_length-- * Math.random());
    let temp = nums[random_index];
    nums[random_index] = nums[num_length];
    nums[num_length] = temp;
  }
  return nums;
};

const SecurityKeypad = () => {
  let nums_init = Array.from({ length: 10 }, (v, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");
  const handlePasswordChange = useCallback(
    (num) => {
      if (password.length === PASSWORD_MAX_LENGTH) {
        return;
      }
      setPassword(password + num.toString());
      console.log(password);
    },
    [password]
  );
  const erasePasswordOne = useCallback(
    (e) => {
      setPassword(
        password.slice(0, password.length === 0 ? 0 : password.length - 1)
      );
    },
    [password]
  );

  const erasePasswordAll = useCallback((e) => {
    setPassword("");
  }, []);

  const shuffleNums = useCallback(
    (num) => (e) => {
      // 0 ~ 9 섞어주기
      let nums_random = Array.from({ length: 10 }, (v, k) => k); // 이 배열을 변경해 입력문자 변경 가능
      setNums(shuffle(nums_random));
      handlePasswordChange(num);
    },
    [handlePasswordChange]
  );

  const onClickSubmitButton = (e) => {
    // 비밀번호 제출
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!");
    } else {
      alert(password + "을 입력하셨습니다.");
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("input", {
      className: "password-container",
      type: "password",
      value: password,
    }),
    React.createElement(
      "div",
      { className: "inputter__flex" },
      nums.map((n, i) => {
        const Basic_button = React.createElement(
          "button",
          {
            className: "num-button__flex spread-effect fantasy-font__2_3rem",
            value: n,
            onClick: shuffleNums(n),
            key: i,
          },
          n
        );
        return i == nums.length - 1
          ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "button",
                {
                  className:
                    "num-button__flex spread-effect fantasy-font__2_3rem",
                  onClick: erasePasswordAll,
                },
                "X"
              ),
              Basic_button
            )
          : Basic_button;
      }),
      React.createElement(
        "button",
        {
          className: "num-button__flex spread-effect fantasy-font__2_3rem",
          onClick: erasePasswordOne,
        },
        "\u2190"
      )
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        {
          type: "submit",
          className: "submit-button",
          onClick: onClickSubmitButton,
        },
        "Submit"
      )
    )
  );
};
export default SecurityKeypad;
