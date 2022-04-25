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
import { getMyMemories, setMemory } from "../../slices/memorySlice";

const { TabPane } = Tabs;
interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, privateMemories, publicMemories } = useSelector(
    (state: RootState) => {
      return {
        privateMemories: state.memory.privateMemories,
        publicMemories: state.memory.publicMemories,
        loading: state.memory.loading,
      };
    },
    shallowEqual
  );

  useEffect(() => {
    dispatch(getMyMemories() as unknown as AnyAction);
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
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Private Memories" key="1">
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <div style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={async () => {
                  await dispatch(setMemory(null));
                  navigate(MEMORY_CREATE);
                }}
              >
                Add Memory
              </Button>
            </div>
            <Row style={{ padding: "1rem" }}>
              {privateMemories.length === 0 ? (
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
                privateMemories.map((memory) => {
                  return <MemoryItem key={memory._id} memory={memory} />;
                })
              )}
            </Row>
          </div>
        </TabPane>
        <TabPane tab="Public Memories" key="2">
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <div style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={async () => {
                  await dispatch(setMemory(null));
                  navigate(MEMORY_CREATE);
                }}
              >
                Add Memory
              </Button>
            </div>
            <Row justify="center">
              {publicMemories.length === 0 ? (
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
                publicMemories.map((memory) => {
                  return <MemoryItem key={memory._id} memory={memory} />;
                })
              )}
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
