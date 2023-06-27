import React from "react";
import Box from "@mui/material/Box";
import GraphComponent from "contents_page/AgeGraphComponent";

function AgeConsumptionPatternGraph(props) {
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
          20대
        </h2>
        <GraphComponent age={20} />
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
          30대
        </h2>
        <GraphComponent age={30} />
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
          40대
        </h2>
        <GraphComponent age={40} />
      </Box>
    </div>
  );
}

export default AgeConsumptionPatternGraph;
