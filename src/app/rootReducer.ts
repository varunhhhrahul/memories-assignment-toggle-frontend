import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "../slices/alertSlice";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
