import React, { useEffect, useRef } from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const footer = footerRef.current;
      const contentHeight = document.documentElement.offsetHeight;
      const windowHeight = window.innerHeight;

      if (footer && contentHeight > windowHeight) {
        footer.style.position = "relative";
      } else {
        footer.style.position = "fixed";
        footer.style.bottom = 0;
        footer.style.width = "100%";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <main>{/* 페이지 컨텐츠 */}</main>
      <MDBFooter
        ref={footerRef}
        bgColor="light"
        className="text-center text-lg-left"
        style={{ marginTop: "auto", position: "fixed", bottom: 0 }}
      >
        <div className="text-center p-3">
          &copy; {new Date().getFullYear()} solbti.site
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
