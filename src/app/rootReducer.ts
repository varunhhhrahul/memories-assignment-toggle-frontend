import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "../slices/alertSlice";
import authReducer from "../slices/authSlice";
import memoryReducer from "../slices/memorySlice";
const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  memory: memoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
