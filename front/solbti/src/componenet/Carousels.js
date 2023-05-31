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
          src="https://api.card-gorilla.com:8080/storage/display/3713/pc_img/29121/%EC%B9%B4%EB%93%9C%EA%B3%A0%EB%A6%B4%EB%9D%BC_%EB%A9%94%EC%9D%B8%EC%85%80%EB%A0%89%EC%85%98_PC.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://api.card-gorilla.com:8080/storage/display/4281/pc_img/28919/230420_16380_KB%EA%B5%AD%EB%AF%BC%EC%B9%B4%EB%93%9C_%EC%B9%B4%EB%93%9C%EA%B3%A0%EB%A6%B4%EB%9D%BC_%EB%A9%94%EC%9D%B8-%EC%85%80%EB%A0%89%EC%85%98PC_860X340_v4.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://api.card-gorilla.com:8080/storage/display/4292/pc_img/29191/44_CardGorilla_MainSelection%28%EB%A9%94%EC%9D%B8%EC%85%80%EB%A0%89%EC%85%98%29_PC_860x340.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
