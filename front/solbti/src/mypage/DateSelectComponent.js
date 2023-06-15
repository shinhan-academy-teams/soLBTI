import React, { useContext, useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import { PayContext } from "context/Date";

function DateSelectComponent(props) {
  const { year, month, setYear, setMonth, cardList, fetchPaymentList } =
    useContext(PayContext);

  const [tempyear, setTempYear] = useState(year);
  const [tempmonth, setTempMonth] = useState(month);

  const makeYearList = () => {
    return Array.from({ length: 201 }, (_, index) => index + 1989);
  };

  const years = makeYearList();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleYearChange = (e) => {
    setTempYear(Number(e.target.textContent)); // e.target.textContent String type이라서 number로 형변환 안되면 입력 안됨
  };

  const handleMonthChange = (e) => {
    setTempMonth(Number(e.target.textContent));
  };

  const handleButtonClick = () => {
    console.log("Selected Year:", year);
    console.log("Selected Month:", month);
    // 여기에서 선택한 년도와 월을 사용하여 원하는 작업을 수행할 수 있습니다.
    setMonth(tempmonth);
    setYear(tempyear);
    fetchPaymentList(cardList, tempyear, tempmonth);
  };

  return (
    <div style={{ display: "inline-flex" }}>
      <Select
        color="primary"
        size="sm"
        value={tempyear}
        onChange={handleYearChange}
        style={{ width: `6rem` }}
      >
        {years.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <span
        style={{ marginRight: "10px", display: "flex", alignItems: "center" }}
      >
        년
      </span>
      <Select
        color="primary"
        size="sm"
        value={tempmonth}
        onChange={handleMonthChange}
        style={{ width: "4rem" }}
      >
        {months.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
      <span
        style={{ marginRight: "10px", display: "flex", alignItems: "center" }}
      >
        월
      </span>
      <Button variant="solid" size="sm" onClick={handleButtonClick}>
        조회
      </Button>
    </div>
  );
}

export default DateSelectComponent;
