import Header from "common/Header";
import Carousels from "componenet/Carousels";
import React from "react";
import { Container } from "react-bootstrap";

function Home(props) {
  return (
    <Container>
      <Carousels />
    </Container>
  );
}

export default Home;
