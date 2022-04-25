import React from "react";

import { useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps, ErrorMessage } from "formik";
import { Row, Col, Input, Card, Button } from "antd";
import { EnhancedLoginFormValues } from "./EnhancedLoginForm";
import { REGISTER } from "../../../constants/routes";

import { RootState } from "../../../app/rootReducer";

interface IFormProps {}

export const LoginForm: React.FC<
  IFormProps & FormikProps<EnhancedLoginFormValues>
> = (props) => {
  const navigate = useNavigate();
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    };
  }, shallowEqual);

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
    // if (role === USER_ROLE.CUSTOMER) {
    //   navigate(CUSTOMER_SERVICES);
    // } else if (role === USER_ROLE.VENDOR) {
    //   navigate(VENDOR_ORDERS);
    // }
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
        <Card title="Login" bordered style={{ width: 300 }}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="phone">Phone</label>

            <Input
              style={{ width: "100%" }}
              value={values.phone}
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              status={touched.phone && errors.phone ? "error" : undefined}
              placeholder="Enter Phone"
            />
            <ErrorMessage name="phone" />
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
