import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Spin } from "antd";
import { LOGIN } from "../constants/routes";
import { RootState } from "../app/rootReducer";

interface IRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IRouteProps> = ({ children }) => {
  const {
    auth: { isAuthenticated, loading, user },
  } = useSelector((state: RootState) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);

  if (!isAuthenticated && !loading) {
    return <Navigate to={LOGIN} />;
  }
  if (user === null) {
    return (
      <div>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
