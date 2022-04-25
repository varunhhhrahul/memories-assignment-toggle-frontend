import React from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps, ErrorMessage } from "formik";
import ReactPlayer from "react-player";
import { Row, Col, Input, Card, Button, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { EnhancedAddOrEditMemoryFormValues } from "./EnhancedAddorEditMemoryForm";
import { REGISTER } from "../../../constants/routes";

import { RootState } from "../../../app/rootReducer";
import { setErrorMsg } from "../../../slices/alertSlice";

interface IFormProps {}

export const AddOrEditMemoryForm: React.FC<
  IFormProps & FormikProps<EnhancedAddOrEditMemoryFormValues>
> = (props) => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = props;

  const { loading, memory } = useSelector((state: RootState) => {
    return {
      loading: state.memory.loading,
      memory: state.memory.memory,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const handleRegisterSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };
  const openCloudWidget = () => {
    // @ts-ignore
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "gamers-world",
          uploadPreset: "r26tykft",
          // resourceType: ["image", "video"],
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log(result);
            if (["image", "video"].includes(result.info.resource_type)) {
              setFieldValue("url", result.info.secure_url);
              setFieldValue("memoryType", result.info.resource_type);
            } else {
              dispatch(setErrorMsg("Please upload an image or video"));
            }
          }
        }
      )
      .open();
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
        <Card
          title={memory === null ? "Add Memory" : "Edit Memory"}
          bordered
          style={{ width: 300 }}
        >
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
              <label htmlFor="url">Url</label>

              <Input
                style={{ width: "100%" }}
                value={values.url}
                name="url"
                onChange={handleChange}
                onBlur={handleBlur}
                status={touched.url && errors.url ? "error" : undefined}
                placeholder="Enter url"
                readOnly
                addonAfter={<UploadOutlined onClick={openCloudWidget} />}
              />
              <ErrorMessage
                name="url"
                render={(msg?: string) => (
                  <div style={{ color: "red" }}>{msg}</div>
                )}
              />
            </div>
            {/* <div style={{ marginTop: "0.5rem" }}>
              <label htmlFor="memoryType" style={{ marginRight: "1rem" }}>
                Type
              </label>

              <Radio.Group
                name="memoryType"
                // disabled={values.url !== ""}
                options={[
                  { label: "Image", value: "image" },
                  { label: "Video", value: "video" },
                ]}
                onChange={handleChange}
                value={values.memoryType}
                optionType="button"
                buttonStyle="solid"
              />
              <ErrorMessage
                name="memoryType"
                render={(msg?: string) => (
                  <div style={{ color: "red" }}>{msg}</div>
                )}
              />
            </div> */}
            <div style={{ marginTop: "0.5rem" }}>
              <label htmlFor="privacy" style={{ marginRight: "1rem" }}>
                Privacy
              </label>

              <Radio.Group
                name="privacy"
                options={[
                  { label: "Public", value: "public" },
                  { label: "Private", value: "private" },
                ]}
                onChange={handleChange}
                value={values.privacy}
                optionType="button"
                buttonStyle="solid"
              />
              <ErrorMessage
                name="privacy"
                render={(msg?: string) => (
                  <div style={{ color: "red" }}>{msg}</div>
                )}
              />
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Button htmlType="submit" type="primary" loading={loading}>
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Col>
      <Col
        md={6}
        style={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {values.url && values.memoryType && (
          <div>
            {values.memoryType === "image" ? (
              <img src={values.url} alt="memory" style={{ width: "100%" }} />
            ) : (
              <div
                style={{
                  float: "right",
                  // marginLeft: "15rem",
                  position: "relative",

                  // paddingTop: "100.25%",
                }}
              >
                <ReactPlayer
                  url={values.url}
                  controls
                  style={{ position: "absolute", top: -150, left: 0 }}
                />
              </div>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};
