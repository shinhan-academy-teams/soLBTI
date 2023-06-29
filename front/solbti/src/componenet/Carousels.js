import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function Carousels(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/carousels/banner1.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/carousels/banner2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/img/carousels/banner3.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
