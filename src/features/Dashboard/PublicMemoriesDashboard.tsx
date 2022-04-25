/* eslint-disable no-underscore-dangle */
import { Spin, Tabs, Button, Card, Row, Col } from "antd";
import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { RootState } from "../../app/rootReducer";
import { MemoryItem } from "../../components/Memory/MemoryItem";
import { MEMORY_CREATE, MEMORY_EDIT } from "../../constants/routes";
import {
  getAllPublicMemories,
  getMyMemories,
  setMemory,
} from "../../slices/memorySlice";

const { TabPane } = Tabs;
interface PublicMemoriesDashboardProps {}

export const PublicMemoriesDashboard: React.FC<PublicMemoriesDashboardProps> = (
  props
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, allMemories, user } = useSelector((state: RootState) => {
    return {
      allMemories: state.memory.allMemories,
      loading: state.memory.loading,
      user: state.auth.user,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(getAllPublicMemories() as unknown as AnyAction);
    dispatch(setMemory(null));
  }, []);

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

  return (
    <div>
      <Row justify="center">
        {allMemories.filter((memory) => memory.user?._id !== user!._id)
          .length === 0 ? (
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5rem",
            }}
          >
            No memories yet
          </Col>
        ) : (
          allMemories
            .filter((memory) => memory.user?._id !== user!._id)
            .map((memory) => {
              return <MemoryItem memory={memory} key={memory._id} isPublic />;
            })
        )}
      </Row>
    </div>
  );
};
