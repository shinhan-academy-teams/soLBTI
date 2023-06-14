import React from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";

function MyInfoAuth(props) {
  const location = useLocation();
  const cno = location.state.cno;
  return (
    <>
      <div>
        <h1>본인인증 페이지</h1>
        <div className="d-grid gap-1">
          <Link to={`/cardlist/writemyinfo/${cno}`}>
            <Button variant="secondary" type="submit">
              다음
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MyInfoAuth;
