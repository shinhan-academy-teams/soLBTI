import Carousels from "componenet/Carousels";
import React from "react";
import { Container } from "react-bootstrap";
import CarouselComponent from "./CarouselComponent";

function Home(props) {
  return (
    <div>
      <Container>
        <Carousels />
      </Container>
      <CarouselComponent />
    </div>
  );
}

export default Home;
