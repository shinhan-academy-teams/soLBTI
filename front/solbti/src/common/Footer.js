import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";

function Footer(props) {
  const locationNow = useLocation();
  if (locationNow.pathname === "/welcome" || locationNow.pathname === "/")
    return null;
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-dark" href="#">
          solbti.site
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
