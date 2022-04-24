import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "../slices/alertSlice";
// import characterReducer from "../slices/characterSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  // character: characterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
