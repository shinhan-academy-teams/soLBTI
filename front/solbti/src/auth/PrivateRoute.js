import React from "react";
import { Route } from "react-router-dom";
import CheckLogin from "./CheckLogin";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = CheckLogin();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
