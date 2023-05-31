import { Button, InputBase, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header(props) {
  const handleSelect = (eventKey) => {};

  if (window.location.pathname === "/poll") return null;

  return (
    <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link href="/" eventKey="2" title="Item">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3" disabled>
          NavLink 3 content
        </Nav.Link>
      </Nav.Item>
      <NavDropdown
        title="Dropdown"
        id="nav-dropdown"
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
      </NavDropdown>

      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      ></Typography>

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="search"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Link to={"/login"}>
        <Button color="inherit">로그인</Button>
      </Link>
      <Link to={"/signup"}>
        <Button color="inherit">회원가입</Button>
      </Link>
    </Nav>
  );
}

export default Header;
