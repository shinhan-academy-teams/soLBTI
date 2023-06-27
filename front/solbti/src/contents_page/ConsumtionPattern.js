import React, { useState } from "react";
import Switch from "@mui/joy/Switch";
import AgeConsumptionPatternGraph from "./AgeConsumptionPatternGraph";
import GenderConsumptionPatternGraph from "./GenderConsumptionPatternGraph";

function ConsumtionPattern(props) {
  const [dark, setDark] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.checked);
    setDark(e.target.checked);
  };
  return (
    <div>
      <h2>소비패턴 페이지</h2>
      <div style={{ textAlign: "center" }}>
        <Switch
          color={dark ? "primary" : "danger"}
          slotProps={{ input: { "aria-label": "dark mode" } }}
          startDecorator={
            <span sx={{ color: dark ? "text.tertiary" : "danger.600" }}>
              {" "}
              나이{" "}
            </span>
          }
          endDecorator={
            <span sx={{ color: dark ? "primary.500" : "text.tertiary" }}>
              {" "}
              성별{" "}
            </span>
          }
          checked={dark}
          onChange={handleChange}
        />
      </div>

      {!dark && (
        <div>
          <AgeConsumptionPatternGraph />
        </div>
      )}
      {dark && (
        <div>
          <GenderConsumptionPatternGraph />
        </div>
      )}
    </div>
  );
}

export default ConsumtionPattern;
