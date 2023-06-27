import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    info: {
      main: "#374BAA",
      contrastText: "white",
    },
  },
});

function Header2(props) {
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
              <Nav.Link>
                <Button color="info" onClick={logout} variant="outlined">
                  로그아웃
                </Button>
              </Nav.Link>
            ) : (
              <ul class="navbar-nav">
                <li class="nav-item">
                  <Nav.Link href="/auth/login">
                    {/* <Button
                      color="info"
                      variant="outlined"
                      style={{ float: "right" }}
                    >
                      로그인
                    </Button> */}
                    <p>로그인</p>
                  </Nav.Link>
                </li>
                <li class="nav-item">
                  <Nav.Link href="/auth/signup">
                    {/* <Button color="info" variant="outlined">
                      회원가입
                    </Button> */}
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
            <NavDropdown.Item href="#action/3.4">
              실적 충족 현황
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </>
  );
}

export default Header2;
