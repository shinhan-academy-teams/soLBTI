import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
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
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Grid item xs={6} ml={20}>
        <Link to={"/home"}>
          <img src="/img/Logo.png" alt="logo" height={40}></img>
        </Link>
      </Grid>
      <Grid item xs={4} ml={15}>
        <Navbar>
          <Container className="login-section">
            <Navbar.Collapse id="basic-navbar-nav">
              <ThemeProvider theme={theme}>
                <Nav className="me-auto">
                  {memCode ? (
                    <Nav.Link>
                      <Button color="info" onClick={logout} variant="contained">
                        로그아웃
                      </Button>
                    </Nav.Link>
                  ) : (
                    <>
                      <Nav.Link href="/auth/login">
                        <Button color="info" variant="outlined">
                          로그인
                        </Button>
                      </Nav.Link>
                      <Nav.Link href="/auth/signup">
                        <Button color="info" variant="outlined">
                          회원가입
                        </Button>
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </ThemeProvider>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Grid>
      <Grid>
        <Navbar>
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">카드 TOP10</Nav.Link>
                <Nav.Link href="/cardlist">전체</Nav.Link>
                <Nav.Link href="#link">콘텐츠</Nav.Link>
                <NavDropdown title="My" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/mypage/0">
                    마이페이지
                  </NavDropdown.Item>
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Grid>
    </Grid>
  );
}

export default Header;
