import Carousels from "componenet/Carousels";
import HorizontalCardList from "componenet/HorizontalCardList";
import React from "react";
import { Container } from "react-bootstrap";

function Home(props) {
  return (
    <Container>
      <Carousels />
      <HorizontalCardList />
    </Container>
  );
}

export default Home;
