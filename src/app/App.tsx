import React, { useEffect } from "react";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AnyAction } from "redux";
import { Provider as AlertProvider } from "react-alert";
import store from "./store";
import setAuthToken from "../utils/setAuthToken";
import { AlertTemplate } from "../components/Alert/AlertTemplate";
import { Alerts } from "../components/Alert/Alert";
import { LOGIN, REGISTER, VERIFY_OTP } from "../constants/routes";
import { loadUser } from "../slices/authSlice";

function App() {
  useEffect(() => {
    (async () => {
      if (localStorage.token) {
        await setAuthToken(localStorage.token);
        store.dispatch(loadUser() as unknown as AnyAction);
      }
    })();
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <Router>
          <Alerts />
          <Switch>
            <Route exact path={LOGIN}>
              <div>Login</div>
            </Route>
            <Route exact path={REGISTER}>
              <div>Register</div>
            </Route>
            <Route exact path={VERIFY_OTP}>
              <div>Verify OTP</div>
            </Route>
          </Switch>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
