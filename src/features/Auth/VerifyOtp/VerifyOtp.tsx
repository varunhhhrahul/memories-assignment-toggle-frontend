import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/rootReducer";
import { DASHBOARD, LOGIN } from "../../../constants/routes";
import EnhancedVerifyOtpForm from "./EnhancedVerifyOtpForm";

interface VerifyOtpProps {}

export const VerifyOtp: React.FC<VerifyOtpProps> = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, phone } = useSelector((state: RootState) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      phone: state.auth.phone,
    };
  }, shallowEqual);
  useEffect(() => {
    if (isAuthenticated) {
      navigate(DASHBOARD);
    }
    if (!isAuthenticated && !phone) {
      navigate(LOGIN);
    }
  }, [isAuthenticated]);
  return <EnhancedVerifyOtpForm navigate={navigate} />;
};
