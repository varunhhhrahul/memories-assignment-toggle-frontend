import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { History } from "history";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "../../../app/store";

import { verifyOtp } from "../../../slices/authSlice";
import { VerifyOtpForm } from "./VerifyOtpForm";

interface IDispatchProps {
  verifyOtp: (otp: string, navigate: NavigateFunction) => AppThunk;
}

export interface EnhancedVerifyOtpFormValues {
  otp: string;
}

export interface EnhancedVerifyOtpFormProps {
  otp?: string;
  navigate: NavigateFunction;
  verifyOtp: (otp: string, navigate: NavigateFunction) => void;
}
const EnhancedVerifyOtpForm = withFormik<
  EnhancedVerifyOtpFormProps,
  EnhancedVerifyOtpFormValues
>({
  mapPropsToValues: (props) => ({
    otp: props.otp || "",
  }),
  validationSchema: Yup.object().shape({
    otp: Yup.string().required("OTP is required").max(6, "OTP is too long"),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { verifyOtp, navigate } = props;
    const { otp } = values;
    verifyOtp(otp, navigate);
    setSubmitting(false);
  },
  displayName: "BasicForm",
})(VerifyOtpForm);

export default connect<null, IDispatchProps>(null, { verifyOtp })(
  EnhancedVerifyOtpForm
);
