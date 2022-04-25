import React from "react";

import { useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps, ErrorMessage } from "formik";
import { Row, Col, Input, Card, Button } from "antd";
import { EnhancedRegisterFormValues } from "./EnhancedRegisterForm";
import { REGISTER } from "../../../constants/routes";

import { RootState } from "../../../app/rootReducer";

interface IFormProps {}

export const RegisterForm: React.FC<
  IFormProps & FormikProps<EnhancedRegisterFormValues>
> = (props) => {
  const navigate = useNavigate();
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    };
  }, shallowEqual);

  const handleRegisterSubmit = (e: any) => {
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
        <Card title="Register" bordered style={{ width: 300 }}>
          <form onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <Input
                style={{ width: "100%" }}
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.name && errors.name ? "error" : undefined}
                placeholder="Enter Name"
              />
              <ErrorMessage
                name="name"
                render={(msg?: string) => (
                  <div style={{ color: "red" }}>{msg}</div>
                )}
              />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <label htmlFor="email">Email</label>

              <Input
                style={{ width: "100%" }}
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.email && errors.email ? "error" : undefined}
                placeholder="Enter email"
              />
              <ErrorMessage
                name="email"
                render={(msg?: string) => (
                  <div style={{ color: "red" }}>{msg}</div>
                )}
              />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
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
              <ErrorMessage
                name="phone"
                render={(msg?: string) => (
                  <div style={{ color: "red" }}>{msg}</div>
                )}
              />
            </div>
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
