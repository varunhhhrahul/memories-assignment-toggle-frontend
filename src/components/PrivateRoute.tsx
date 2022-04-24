import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Spin } from "antd";
import { LOGIN } from "../constants/routes";
import { RootState } from "../app/rootReducer";

interface IRouteProps extends RouteProps {}

const PrivateRoute: React.FC<IRouteProps> = ({ children, ...rest }) => {
  const {
    auth: { isAuthenticated, loading, user },
  } = useSelector((state: RootState) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);

  return (
    <Route
      {...rest}
      // @ts-ignore
      render={({ location }) => {
        if (!isAuthenticated && !loading) {
          return (
            <Redirect
              to={{
                pathname: LOGIN,
                state: {
                  from: location,
                },
              }}
            />
          );
        }
        if (user === null) {
          return (
            <div>
              <Spin tip="Loading..." size="large" />
            </div>
          );
        }
        return children;
      }}
    />
  );
};

export default PrivateRoute;
