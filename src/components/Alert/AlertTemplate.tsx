import React, { useState } from "react";
import { AlertComponentPropsWithStyle } from "react-alert";
import { Alert } from "antd";

interface IMessageProps {
  message: React.ReactNode;
  severity: "error" | "success" | "info" | undefined;
  handleClose:
    | ((event: Event | React.SyntheticEvent<any, Event>) => void)
    | undefined;
}

const Message: React.FC<IMessageProps> = ({
  message,
  severity,
  handleClose,
}) => {
  const [open] = useState(true);

  return (
    <Alert
      style={{ margin: "1rem" }}
      type={severity}
      onClose={handleClose}
      showIcon
      message={message}
    />
  );
};

interface IAlertTemplateProps extends AlertComponentPropsWithStyle {}

export const AlertTemplate: React.FC<IAlertTemplateProps> = ({
  options,
  message,
  close,
}) => <Message severity={options.type} handleClose={close} message={message} />;
