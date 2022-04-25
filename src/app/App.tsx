import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { AnyAction } from "redux";
import { Provider as AlertProvider } from "react-alert";
import store from "./store";
import setAuthToken from "../utils/setAuthToken";
import { AlertTemplate } from "../components/Alert/AlertTemplate";
import { Alerts } from "../components/Alert/Alert";
import { LOGIN, REGISTER, VERIFY_OTP } from "../constants/routes";
import { loadUser } from "../slices/authSlice";
import { Navbar } from "../components/Navbar";
import { Login } from "../features/Auth/Login/Login";
import { Register } from "../features/Auth/Register/Register";
import { VerifyOtp } from "../features/Auth/VerifyOtp/VerifyOtp";

function App() {
  // useEffect(() => {
  //   (async () => {
  //     if (localStorage.token) {
  //       await setAuthToken(localStorage.token);
  //       store.dispatch(loadUser() as unknown as AnyAction);
  //     }
  //   })();
  // }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <Router>
          <Alerts />
          <Navbar />
          <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route path={REGISTER} element={<Register />} />
            <Route path={VERIFY_OTP} element={<VerifyOtp />} />
            <Route path="*" element={<Navigate to={LOGIN} replace />} />
          </Routes>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
