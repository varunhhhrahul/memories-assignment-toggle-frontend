import { Spin, Tabs, Button } from "antd";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { RootState } from "../../app/rootReducer";
import { MEMORY_CREATE } from "../../constants/routes";
import { getMyMemories } from "../../slices/memorySlice";

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
          <div style={{ margin: "1rem" }}>
            <div style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={() => {
                  navigate(MEMORY_CREATE);
                }}
              >
                Add Memory
              </Button>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Public Memories" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};
