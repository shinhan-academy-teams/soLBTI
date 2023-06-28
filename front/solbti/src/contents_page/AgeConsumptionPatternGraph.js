import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import GraphComponent from "contents_page/AgeGraphComponent";
import AOS from "aos";
import "aos/dist/aos.css";

function AgeConsumptionPatternGraph(props) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <Box
        sx={{
          width: "50rem",
          backgroundColor: "#EFEFFB",
          borderRadius: "30px",
          margin: "2rem auto",
        }}
      >
        <h2 style={{ position: "relative", left: "40px", top: "30px" }}>
          20대
        </h2>
        <GraphComponent age={20} />
      </Box>
      <Box
        sx={{
          margin: "2rem auto",
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
          margin: "2rem auto",
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
