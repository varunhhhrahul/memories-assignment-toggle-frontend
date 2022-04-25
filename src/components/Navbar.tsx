import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { DASHBOARD, LOGIN, REGISTER, MEMORY_LIST } from "../constants/routes";
import { RootState } from "../app/rootReducer";
import { logout } from "../slices/authSlice";

const { Header, Content, Footer } = Layout;

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => {
    return {
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const links =
    user !== null && isAuthenticated
      ? [
          {
            label: "Dashboard",
            key: "dashboard",
            onClick: () => {
              navigate(DASHBOARD);
            },
          },
          {
            label: "Public Memories",
            key: "memories",
            onClick: () => {
              navigate(MEMORY_LIST);
            },
          },

          {
            label: "Logout",
            key: "logout",
            onClick: () => {
              dispatch(logout() as unknown as AnyAction);
              navigate(LOGIN);
            },
            click: true,
          },
        ]
      : [
          {
            label: "Login",
            key: "login",
            onClick: () => {
              navigate(LOGIN);
            },
          },
          {
            label: "Register",
            key: "register",
            onClick: () => {
              navigate(REGISTER);
            },
          },
        ];
  return (
    <Header
      style={{
        zIndex: 1,
        width: "100%",
        // display: "flex",
        // justifyContent: "space-between",
        // flexDirection: "row",
      }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={links}
      />
    </Header>
  );
};
