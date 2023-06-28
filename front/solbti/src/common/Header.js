import React, { useState } from "react";
import { Nav, NavDropdown, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "memCode",
  ]);
  const [memCode, setmemCode] = useState(cookies.memCode);

  const logout = () => {
    removeCookie("memCode");
    removeCookie("accessToken");
    window.location.reload();
  };

  const locationNow = useLocation();
  if (locationNow.pathname === "/welcome" || locationNow.pathname === "/")
    return null;
  return (
    <>
      <Container>
        <Nav className="navbar navbar-expand-sm">
          <div className="container-fluid">
            <Link to={"/home"}>
              <img src="/img/Logo.png" alt="logo" height={40}></img>
            </Link>
            {memCode ? (
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Nav.Link>
                    <p onClick={logout}>로그아웃</p>
                  </Nav.Link>
                </li>
              </ul>
            ) : (
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Nav.Link href="/auth/login">
                    <p>로그인</p>
                  </Nav.Link>
                </li>
                <li class="nav-item">
                  <Nav.Link href="/auth/signup">
                    <p>회원가입</p>
                  </Nav.Link>
                </li>
              </ul>
            )}
          </div>
        </Nav>
      </Container>
      <Container>
        <Nav>
          <Nav.Link href="/chart" style={{ marginRight: "30px" }}>
            카드 TOP10
          </Nav.Link>
          <Nav.Link href="/cardlist" style={{ marginRight: "30px" }}>
            전체
          </Nav.Link>
          <Nav.Link href="/contents" style={{ marginRight: "30px" }}>
            콘텐츠
          </Nav.Link>
          <NavDropdown
            title="마이"
            id="basic-nav-dropdown"
            style={{ marginRight: "30px" }}
          >
            <NavDropdown.Item href="/mypage/cards">
              내 카드 조회
            </NavDropdown.Item>
            <NavDropdown.Item href="/mypage/analyze">
              카드 이용 내역
            </NavDropdown.Item>
            <NavDropdown.Item href="/mypage/info">
              내 정보 관리
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </>
  );
}

export default Header;
