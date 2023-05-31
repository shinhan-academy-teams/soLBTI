import React from "react";
import { ResponsiveLine } from "@nivo/line";

function MoneyGraphComponent(props) {
  const data = [
    {
      id: "japan",
      color: "hsl(255, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 14,
        },
        {
          x: "helicopter",
          y: 262,
        },
        {
          x: "boat",
          y: 30,
        },
        {
          x: "train",
          y: 154,
        },
        {
          x: "subway",
          y: 41,
        },
        {
          x: "bus",
          y: 231,
        },
        {
          x: "car",
          y: 166,
        },
        {
          x: "moto",
          y: 65,
        },
        {
          x: "bicycle",
          y: 285,
        },
        {
          x: "horse",
          y: 249,
        },
        {
          x: "skateboard",
          y: 68,
        },
        {
          x: "others",
          y: 96,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(72, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 59,
        },
        {
          x: "helicopter",
          y: 212,
        },
        {
          x: "boat",
          y: 28,
        },
        {
          x: "train",
          y: 285,
        },
        {
          x: "subway",
          y: 156,
        },
        {
          x: "bus",
          y: 221,
        },
        {
          x: "car",
          y: 63,
        },
        {
          x: "moto",
          y: 200,
        },
        {
          x: "bicycle",
          y: 225,
        },
        {
          x: "horse",
          y: 134,
        },
        {
          x: "skateboard",
          y: 46,
        },
        {
          x: "others",
          y: 220,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(71, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 195,
        },
        {
          x: "helicopter",
          y: 85,
        },
        {
          x: "boat",
          y: 51,
        },
        {
          x: "train",
          y: 106,
        },
        {
          x: "subway",
          y: 98,
        },
        {
          x: "bus",
          y: 66,
        },
        {
          x: "car",
          y: 53,
        },
        {
          x: "moto",
          y: 154,
        },
        {
          x: "bicycle",
          y: 31,
        },
        {
          x: "horse",
          y: 17,
        },
        {
          x: "skateboard",
          y: 12,
        },
        {
          x: "others",
          y: 162,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(333, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 7,
        },
        {
          x: "helicopter",
          y: 15,
        },
        {
          x: "boat",
          y: 207,
        },
        {
          x: "train",
          y: 29,
        },
        {
          x: "subway",
          y: 226,
        },
        {
          x: "bus",
          y: 277,
        },
        {
          x: "car",
          y: 12,
        },
        {
          x: "moto",
          y: 259,
        },
        {
          x: "bicycle",
          y: 167,
        },
        {
          x: "horse",
          y: 107,
        },
        {
          x: "skateboard",
          y: 187,
        },
        {
          x: "others",
          y: 285,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(57, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 113,
        },
        {
          x: "helicopter",
          y: 195,
        },
        {
          x: "boat",
          y: 217,
        },
        {
          x: "train",
          y: 255,
        },
        {
          x: "subway",
          y: 60,
        },
        {
          x: "bus",
          y: 24,
        },
        {
          x: "car",
          y: 116,
        },
        {
          x: "moto",
          y: 273,
        },
        {
          x: "bicycle",
          y: 113,
        },
        {
          x: "horse",
          y: 235,
        },
        {
          x: "skateboard",
          y: 155,
        },
        {
          x: "others",
          y: 57,
        },
      ],
    },
  ];
  const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
  return (
    <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
      <MyResponsiveLine data={data} />
    </div>
  );
}

export default MoneyGraphComponent;
