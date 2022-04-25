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
    <Col
      xs={{ span: 12, offset: 1 }}
      sm={{ span: 8, offset: 1 }}
      md={{ span: 6, offset: 1 }}
      lg={{ span: 4, offset: 2 }}
      key={memory._id}
      style={{
        margin: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Card
        title={memory.name}
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
        {!isPublic && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
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
        )}
        <br />
        {memory.memoryType === "image" ? (
          <img
            src={memory.url}
            alt="memory"
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <ReactPlayer url={memory.url} width={150} height={150} controls />
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
