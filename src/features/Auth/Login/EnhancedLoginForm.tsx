import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { History } from "history";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "../../../app/store";

import { login } from "../../../slices/authSlice";
import { LoginForm } from "./LoginForm";

interface IDispatchProps {
  login: (phone: string, navigate: NavigateFunction) => AppThunk;
}

export interface EnhancedLoginFormValues {
  phone: string;
}

export interface EnhancedLoginFormProps {
  phone?: string;
  navigate: NavigateFunction;
  login: (phone: string, navigate: NavigateFunction) => void;
}
const EnhancedLoginForm = withFormik<
  EnhancedLoginFormProps,
  EnhancedLoginFormValues
>({
  mapPropsToValues: (props) => ({
    phone: props.phone || "",
  }),
  validationSchema: Yup.object().shape({
    phone: Yup.string()
      .required("Phone is required")
      .max(10, "Phone is too long"),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { login, navigate } = props;
    const { phone } = values;
    login(phone, navigate);
    setSubmitting(false);
  },
  displayName: "BasicForm",
})(LoginForm);

export default connect<null, IDispatchProps>(null, { login })(
  EnhancedLoginForm
);
