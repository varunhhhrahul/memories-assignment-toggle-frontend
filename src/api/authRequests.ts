import { User } from "../constants/models/User";
import { AUTH } from "../constants/routes";
import { API } from "./api";

export const login = async (phone: string) => {
  try {
    const res = await API.post<{ success: true; data: string }>(
      `/${AUTH}/login`,
      {
        phone,
      }
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name: string, email: string, phone: string) => {
  try {
    const res = await API.post<{ success: true; token: string }>(
      `/${AUTH}/register`,
      {
        phone,
        name,
        email,
      }
    );
    return res.data.token;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (phone: string, otp: string) => {
  try {
    const res = await API.post<{ success: true; token: string }>(
      `/${AUTH}/verify-otp`,
      {
        phone,
        otp,
      }
    );
    return res.data.token;
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  try {
    const res = await API.get<{ success: true; data: User }>(`/${AUTH}/me`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const res = await API.get<{ success: true; data: Object }>(
      `/${AUTH}/logout`
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
