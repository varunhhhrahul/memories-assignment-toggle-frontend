/* eslint-disable no-underscore-dangle */
import { Col, Card, Button, Divider } from "antd";
import React from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { Memory } from "../../constants/models/Memory";
import { MEMORY_EDIT } from "../../constants/routes";
import { deleteMemory, setMemory } from "../../slices/memorySlice";

interface MemoryItemProps {
  memory: Memory;
  isPublic?: boolean;
}

export const MemoryItem: React.FC<MemoryItemProps> = ({
  memory,
  isPublic = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Col span={4} key={memory._id} style={{ margin: "1rem" }}>
      <Card
        title={memory.name}
        extra={
          !isPublic && (
            <div style={{ marginLeft: "1rem" }}>
              <Button
                type="ghost"
                onClick={async () => {
                  await dispatch(setMemory(memory));
                  navigate(MEMORY_EDIT);
                }}
              >
                Edit
              </Button>
              <Button
                type="ghost"
                onClick={async () => {
                  dispatch(deleteMemory(memory._id) as unknown as AnyAction);
                }}
              >
                Delete
              </Button>
            </div>
          )
        }
        style={{
          width: "100%",
          margin: "1rem",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {memory.memoryType === "image" ? (
          <img
            src={memory.url}
            alt="memory"
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <ReactPlayer url={memory.url} width={200} height={200} controls />
        )}
        {isPublic && (
          <>
            <Divider />{" "}
            <p>
              By <strong>{memory.user?.name}</strong>
            </p>
          </>
        )}
      </Card>
    </Col>
  );
};

MemoryItem.defaultProps = {
  isPublic: false,
};
