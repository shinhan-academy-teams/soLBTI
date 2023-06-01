import { Button } from "@mui/material";
import React from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";

function Header(props) {
  return (
    <div>
      <div className="header-top">
        {/* before login */}
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/auth/login">
                  <Button color="inherit">로그인</Button>
                </Nav.Link>
                <Nav.Link href="/auth/signup">
                  <Button color="inherit">회원가입</Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="header-body">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img src="/img/Logo.png" alt="logo"></img>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">카드 TOP10</Nav.Link>
                <Nav.Link href="#link">검색</Nav.Link>
                <Nav.Link href="#link">콘텐츠</Nav.Link>
                <NavDropdown title="My" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/mypage/1">
                    내 카드 조회
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/mypage/2">
                    카드 이용 내역
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    포인트 조회
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    실적 충족 현황
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
