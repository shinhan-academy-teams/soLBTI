import "./cardliststyles.css";
import React from "react";
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
const food = [
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditAQDD6N.png",
    340,
    10,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditPLAD43.png",
    20,
    40,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditBJACQ6.png",
    60,
    90,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditAXJCLT.gif",
    80,
    120,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditAXGC75_VISA.gif",
    100,
    140,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreditBOAD16.png",
    205,
    245,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreaditBMABZ2.png",
    260,
    290,
  ],
  [
    "https://www.shinhancard.com/pconts/images/contents/card/plate/cdCreaditBJABE3.png",
    290,
    320,
  ],
];

export default function MyCardList() {
  return (
    <div id="cardlist">
      {food.map(([emoji, hueA, hueB]) => (
        <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
      ))}
    </div>
  );
}
