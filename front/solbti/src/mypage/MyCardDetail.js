import React from "react";
import { NavDropdown } from "react-bootstrap";

function MyCardDetail(props) {
  function showNum() {
    alert("카드번호 전체조회 하시겠습니까?");
  }

  function changePwd() {
    alert("비밀번호 변경 하시겠습니까?");
  }

  function stopCard() {
    alert("일시정지 하시겠습니까?");
  }

  function lostCard() {
    alert("분실신고 하시겠습니까?");
  }
  function stopCard() {
    alert("재발급신청 하시겠습니까?");
  }
  return (
    <>
      <h4>내 카드 관리</h4>
      <h3>알뜰교통 신한카드 S20체크</h3>
      <div styles={{ position: "absolute", left: "20px", top: "250px" }}>
        <h3 style={{ textAlign: "left", margin: "30px" }}>카드 관리</h3>

        <ul class="list-group">
          <div class="w-25 p-3">
            <NavDropdown.Item
              onClick={() => showNum()}
              style={{ textAlign: "center" }}
            >
              <li class="list-group-item">🔍 카드번호 전체 보기</li>
            </NavDropdown.Item>
          </div>
          <div class="w-25 p-3">
            <NavDropdown.Item
              onClick={() => changePwd("John")}
              style={{ textAlign: "center" }}
            >
              <li class="list-group-item">🗝 카드 비밀번호 변경</li>
            </NavDropdown.Item>
          </div>
          <div class="w-25 p-3">
            <NavDropdown.Item
              onClick={() => stopCard("John")}
              style={{ textAlign: "center" }}
            >
              <li class="list-group-item">❌ 일시정지</li>
            </NavDropdown.Item>
          </div>
          <div class="w-25 p-3">
            <NavDropdown.Item
              onClick={() => lostCard("John")}
              style={{ textAlign: "center" }}
            >
              <li class="list-group-item">📢 분실신고</li>
            </NavDropdown.Item>
          </div>
          <div class="w-25 p-3">
            <NavDropdown.Item
              onClick={() => stopCard("John")}
              style={{ textAlign: "center" }}
            >
              <li class="list-group-item">🔔 재발급신청</li>
            </NavDropdown.Item>
          </div>
        </ul>
      </div>
      ;
    </>
  );
}

export default MyCardDetail;
