import { NavigateFunction } from "react-router-dom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import * as REQUESTS from "../api/authRequests";
import { User } from "../constants/models/User";
import isEmpty from "../utils/is-empty";
import { setErrorMsg, setSuccessMsg } from "./alertSlice";
import { LOGIN, VERIFY_OTP, DASHBOARD } from "../constants/routes";
import setAuthToken from "../utils/setAuthToken";

export interface authState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  phone: string | null;
}

export const initialState: authState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  phone: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
    },
    authComplete(state) {
      state.loading = false;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.isAuthenticated = !isEmpty(action.payload);
      state.token = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.isAuthenticated = !isEmpty(action.payload);
      state.user = action.payload;
      state.loading = false;
    },
    setPhone(state, action: PayloadAction<string | null>) {
      state.phone = action.payload;
    },
    setLogout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.phone = null;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  authComplete,
  authStart,
  setCurrentUser,
  setLoading,
  setLogout,
  setPhone,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;

// thunks

//load user
export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    const data = await REQUESTS.getMe();
    dispatch(setCurrentUser(data));
  } catch (err: any) {
    dispatch(setErrorMsg(err.response.data.error));
  }
};

//register user
export const register =
  (
    name: string,
    email: string,
    phone: string,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart());
      const data = await REQUESTS.register(name, email, phone);
      dispatch(authComplete());
      navigate(LOGIN);
      dispatch(setSuccessMsg("Registration successful"));
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };

//login user
export const login =
  (phone: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart());
      dispatch(setPhone(phone));
      const data = await REQUESTS.login(phone);
      dispatch(authComplete());
      navigate(VERIFY_OTP);
      dispatch(setSuccessMsg("OTP sent"));
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };

//verify user otp
export const verifyOtp =
  (otp: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(authStart());
      const phone = getState().auth.phone;
      const data = await REQUESTS.verifyOtp(phone!, otp);
      await setAuthToken(data);
      dispatch(setToken(data));
      dispatch(loadUser());
      dispatch(authComplete());
      navigate(DASHBOARD);
      dispatch(setSuccessMsg("Logged in successfully"));
    } catch (err: any) {
      dispatch(setErrorMsg(err.response.data.error));
    }
  };

//logout
export const logout = (): AppThunk => async (dispatch) => {
  await REQUESTS.logout();
  dispatch(setLogout());

  dispatch(setSuccessMsg("Logged out successfully"));
};
