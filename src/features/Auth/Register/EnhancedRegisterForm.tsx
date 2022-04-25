import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { History } from "history";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "../../../app/store";

import { register } from "../../../slices/authSlice";
import { RegisterForm } from "./RegisterForm";

interface IDispatchProps {
  register: (
    name: string,
    email: string,
    phone: string,
    navigate: NavigateFunction
  ) => AppThunk;
}

export interface EnhancedRegisterFormValues {
  name: string;
  email: string;
  phone: string;
}

export interface EnhancedRegisterFormProps {
  name?: string;
  email?: string;
  phone?: string;
  navigate: NavigateFunction;
  register: (
    name: string,
    email: string,
    phone: string,
    navigate: NavigateFunction
  ) => void;
}
const EnhancedRegisterForm = withFormik<
  EnhancedRegisterFormProps,
  EnhancedRegisterFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.name || "",
    email: props.email || "",
    phone: props.phone || "",
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .max(10, "Phone is too long"),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { register, navigate } = props;
    const { name, email, phone } = values;
    register(name, email, phone, navigate);
    setSubmitting(false);
  },
  displayName: "BasicForm",
})(RegisterForm);

export default connect<null, IDispatchProps>(null, { register })(
  EnhancedRegisterForm
);
