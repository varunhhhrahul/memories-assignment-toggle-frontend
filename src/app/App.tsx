import React, { useEffect } from "react";
import { Provider } from "react-redux";

import { Provider as AlertProvider } from "react-alert";
import store from "./store";
import setAuthToken from "../utils/setAuthToken";
import { AlertTemplate } from "../components/Alert/AlertTemplate";

function App() {
  useEffect(() => {
    (async () => {
      if (localStorage.token) {
        await setAuthToken(localStorage.token);
        // store.dispatch(loadUser());
      }
    })();
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <div className="App">
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </AlertProvider>
    </Provider>
  );
}

export default App;
