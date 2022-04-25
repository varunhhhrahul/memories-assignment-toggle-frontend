/* eslint-disable no-underscore-dangle */
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { History } from "history";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "../../../app/store";

import { addMemory, updateMemory } from "../../../slices/memorySlice";
import { AddOrEditMemoryForm } from "./AddOrEditMemoryForm";
import { Memory } from "../../../constants/models/Memory";

interface IDispatchProps {
  addMemory: (
    name: string,
    url: string,
    memoryType: string,
    privacy: string,
    navigate: NavigateFunction
  ) => AppThunk;
  updateMemory: (
    id: string,
    name: string,
    url: string,
    memoryType: string,
    privacy: string,
    navigate: NavigateFunction
  ) => AppThunk;
}

export interface EnhancedAddOrEditMemoryFormValues {
  name: string;
  url: string;
  memoryType: string;
  privacy: string;
}

export interface EnhancedAddOrEditMemoryFormProps {
  name?: string;
  url?: string;
  memoryType?: string;
  privacy?: string;
  memory: Memory | null;
  navigate: NavigateFunction;
  addMemory: (
    name: string,
    url: string,
    memoryType: string,
    privacy: string,
    navigate: NavigateFunction
  ) => void;
  updateMemory: (
    id: string,
    name: string,
    url: string,
    memoryType: string,
    privacy: string,
    navigate: NavigateFunction
  ) => void;
}
const EnhancedAddOrEditMemoryForm = withFormik<
  EnhancedAddOrEditMemoryFormProps,
  EnhancedAddOrEditMemoryFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.memory ? props.memory.name : "",
    url: props.memory ? props.memory.url : "",
    memoryType: props.memory ? props.memory.memoryType : "",
    privacy: props.memory ? props.memory.privacy : "",
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Title for memory is required"),

    url: Yup.string().required("Please upload a photo or video"),
    memoryType: Yup.string()
      .oneOf(["image", "video"])
      .required("Memory Type is required"),

    privacy: Yup.string()
      .oneOf(["public", "private"])
      .required("Privacy is required"),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { addMemory, updateMemory, memory, navigate } = props;
    const { name, url, memoryType, privacy } = values;
    if (memory) {
      updateMemory(memory._id, name, url, memoryType, privacy, navigate);
    } else {
      addMemory(name, url, memoryType, privacy, navigate);
    }
    setSubmitting(false);
  },
  displayName: "BasicForm",
})(AddOrEditMemoryForm);

export default connect<null, IDispatchProps>(null, { addMemory, updateMemory })(
  EnhancedAddOrEditMemoryForm
);
