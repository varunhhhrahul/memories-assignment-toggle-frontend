import React from "react";

import { useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps, ErrorMessage } from "formik";
import { Row, Col, Input, Card, Button } from "antd";
import { EnhancedVerifyOtpFormValues } from "./EnhancedVerifyOtpForm";
import { REGISTER } from "../../../constants/routes";

import { RootState } from "../../../app/rootReducer";

interface IFormProps {}

export const VerifyOtpForm: React.FC<
  IFormProps & FormikProps<EnhancedVerifyOtpFormValues>
> = (props) => {
  const navigate = useNavigate();
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    };
  }, shallowEqual);
  

  const handleVerifyOtpSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <Row>
      <Col
        md={6}
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card title="Verify OTP" bordered style={{ width: 300 }}>
          <form onSubmit={handleVerifyOtpSubmit}>
            <label htmlFor="otp">OTP</label>

            <Input
              style={{ width: "100%" }}
              value={values.otp}
              name="otp"
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.otp && errors.otp ? "error" : undefined}
              placeholder="Enter otp"
            />
            <ErrorMessage
              name="otp"
              render={(msg?: string) => (
                <div style={{ color: "red" }}>{msg}</div>
              )}
            />
            <div style={{ marginTop: "2rem" }}>
              <Button htmlType="submit" type="primary" loading={authLoading}>
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Col>
    </Row>
  );
};
