import React from "react";
import Box from "@mui/material/Box";
import GraphComponent from "contents_page/GenderGraphComponent";

function GenderConsumptionPatternGraph(props) {
  return (
    <div>
      <Box
        sx={{
          margin: "2rem",
          width: "50rem",
          backgroundColor: "#EFEFFB",
          borderRadius: "30px",
        }}
      >
        <h2 style={{ position: "relative", left: "40px", top: "30px" }}>
          남성
        </h2>
        <GraphComponent gender={"M"} />
      </Box>
      <Box
        sx={{
          margin: "2rem",
          width: "50rem",
          backgroundColor: "#EFEFFB",
          borderRadius: "30px",
        }}
      >
        <h2 style={{ position: "relative", left: "40px", top: "30px" }}>
          여성
        </h2>
        <GraphComponent gender={"F"} />
      </Box>
    </div>
  );
}

export default GenderConsumptionPatternGraph;
