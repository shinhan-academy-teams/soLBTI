import { useState } from "react";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function CardModal({ open, setPopup, cards }) {
  const handleClose = () => {
    setPopup({ open: false });
  };
  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>당신에게 추천하는 카드</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {cards.map((card, index) => (
              <Carousel.Item>
                <Link to={`/cardlist/detail/${card.commonCardCode}`}>
                  <img className="d-block w-100" src={card.imgURL} alt="card" />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/chart">
            <Button variant="dark">실시간 인기 카드 보러가기</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CardModal;
