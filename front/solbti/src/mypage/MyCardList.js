import "./cardliststyles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
const hue = (h) => `hsl(${h}, 100%, 50%)`;
function Card({ emoji, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "h1",
      { style: { textAlign: "center", margin: "0 auto" } },
      "\uB0B4 \uCE74\uB4DC \uC870\uD68C"
    ),
    React.createElement(
      motion.div,
      {
        className: "card-container",
        initial: "offscreen",
        whileInView: "onscreen",
        viewport: { once: true, amount: 0.8 },
      },
      React.createElement("div", {
        className: "splash",
        style: { background },
      }),
      React.createElement(
        motion.div,
        { className: "mycard", variants: cardVariants },
        React.createElement("img", {
          src: emoji,
          alt: "\uCE74\uB4DC\uC774\uBBF8\uC9C0",
          style: {
            width: "auto",
            height: "300px",
            transform: "rotate(90deg)",
          },
        })
      )
    )
  );
}

export default function MyCardList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      url: "/auth/mycardlist.do",
      method: "get",
      params: { id: 28 },
    })
      .then((response) => {
        const newData = response.data.map((item, index) => [
          item.card.imgURL,
          (957 * index) % 350,
          (index * 257) % 350,
        ]);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="cardlist">
      {data.map(([emoji, hueA, hueB]) => (
        <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
      ))}
    </div>
  );
}
