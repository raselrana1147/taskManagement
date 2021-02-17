import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PUBLIC_PATH } from "./Constant";


function AuthenticateRoutes({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} exact={true} />
        ) : (
          <Redirect
            to={{
              pathname: `${PUBLIC_PATH}login`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AuthenticateRoutes;