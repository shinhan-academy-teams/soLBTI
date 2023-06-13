import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";

function Graphcomponent(props) {
  const [Data, setData] = useState([]);
  useEffect(() => {
    axios({
      url: "/payment/payrank",
      method: "get",
      params: { year: props.yyyy, month: props.mm },
    })
      .then((response) => {
        response.data.map((item, index) =>
          setData({
            ...Data,
            id: item[0],
            value: item[1],
            color: "hsl(66, 70%, 50%)",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.yyyy, props.mm]);

  // const Data = [
  //   {
  //     id: "커피",
  //     label: "커피 2번이나 사주신 팀장님 가슴 웅장해진다",
  //     value: 431,
  //     color: "hsl(66, 70%, 50%)",
  //   },
  //   {
  //     id: "국밥",
  //     label: "뜨끈한 국밥 든든하게 먹고 말지",
  //     value: 231,
  //     color: "hsl(233, 70%, 50%)",
  //   },
  //   {
  //     id: "초밥",
  //     label: "초밥 먹고싶다",
  //     value: 356,
  //     color: "hsl(214, 70%, 50%)",
  //   },
  //   {
  //     id: "파스타",
  //     label: "토마토 미트볼 파스타 먹고 싶다",
  //     value: 280,
  //     color: "hsl(346, 70%, 50%)",
  //   },
  //   {
  //     id: "치킨",
  //     label: "바삭바삭하게 튀긴 핫 크리스피 치킨 먹고싶다",
  //     value: 518,
  //     color: "hsl(129, 70%, 50%)",
  //   },
  // ];

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
            id: "커피",
          },
          id: "dots",
        },
        {
          match: {
            id: "국밥",
          },
          id: "dots",
        },
        {
          match: {
            id: "파스타",
          },
          id: "dots",
        },
        {
          match: {
            id: "치킨",
          },
          id: "dots",
        },
        {
          match: {
            id: "초밥",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      // legends={[
      //   {
      //     anchor: "right",
      //     direction: "column",
      //     justify: false,
      //     translateX: -520,
      //     translateY: 30,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
  return (
    <div style={{ width: "auto", height: "400px", margin: "0 auto" }}>
      <MyResponsivePie data={Data}> </MyResponsivePie>
    </div>
  );
}

export default Graphcomponent;
