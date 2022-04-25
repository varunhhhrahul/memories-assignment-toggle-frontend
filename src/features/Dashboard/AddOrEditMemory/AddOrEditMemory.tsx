import { Spin } from "antd";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/rootReducer";
import { DASHBOARD } from "../../../constants/routes";
import EnhancedAddOrEditMemoryForm from "./EnhancedAddorEditMemoryForm";

interface AddOrEditMemoryProps {}

export const AddOrEditMemory: React.FC<AddOrEditMemoryProps> = (props) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, memory } = useSelector(
    (state: RootState) => {
      return {
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.memory.loading,
        memory: state.memory.memory,
      };
    },
    shallowEqual
  );
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
  return <EnhancedAddOrEditMemoryForm memory={memory} navigate={navigate} />;
};
