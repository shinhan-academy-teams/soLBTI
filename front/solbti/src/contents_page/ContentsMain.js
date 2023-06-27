import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBContainer,
} from "mdb-react-ui-kit";

function ContentsMain(props) {
  const clickContent1 = () => {
    window.location.href = "/welcome";
  };

  const clickContent2 = () => {
    window.location.href = "/contents/consumtion";
  };

  const clickContent3 = () => {
    window.location.href = "/contents/chat";
  };

  return (
    <MDBContainer>
      <MDBCardGroup>
        <MDBCard onClick={clickContent1}>
          <MDBCardImage
            src="/img/contentsPage/sobiti.png"
            className="rounded-pill"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle></MDBCardTitle>
            <MDBCardText></MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard onClick={clickContent2}>
          <MDBCardImage
            src="/img/contentsPage/sobipattern.png"
            alt="..."
            className="rounded-pill"
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle> </MDBCardTitle>
            <MDBCardText></MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard onClick={clickContent3}>
          <MDBCardImage
            src="/img/contentsPage/chat.png"
            alt="..."
            position="top"
          />
          <MDBCardBody>
            <MDBCardTitle></MDBCardTitle>
            <MDBCardText></MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBContainer>
  );
}

export default ContentsMain;
