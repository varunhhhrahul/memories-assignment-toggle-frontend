import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/rootReducer";
import { DASHBOARD } from "../../../constants/routes";
import EnhancedLoginForm from "./EnhancedLoginForm";

interface LoginProps {}

export const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  }, shallowEqual);
  useEffect(() => {
    if (isAuthenticated) {
      navigate(DASHBOARD);
    }
  }, [isAuthenticated]);
  return <EnhancedLoginForm navigate={navigate} />;
};
