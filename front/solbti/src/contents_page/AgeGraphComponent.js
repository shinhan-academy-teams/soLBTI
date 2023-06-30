import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";

function AgeGraphComponent(props) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios({
      url: "/payment/age/" + props.age,
      method: "get",
    })
      .then((response) => {
        console.log(response.data);
        const newData = response.data.map((item) => ({
          id: item[0],
          value: item[1],
          color: "hsl(66, 70%, 50%)",
        }));
        let sortedData = [...newData];
        sortedData.sort((a, b) => b.value - a.value);
        setData(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [Data]);

  const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "외식",
          },
          id: "dots",
        },
        {
          match: {
            id: "학원",
          },
          id: "dots",
        },
        {
          match: {
            id: "유흥",
          },
          id: "dots",
        },
      ]}
    />
  );
  return (
    <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
      <MyResponsivePie data={Data}> </MyResponsivePie>
    </div>
  );
}

export default AgeGraphComponent;
