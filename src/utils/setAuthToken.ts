/* eslint-disable @typescript-eslint/dot-notation */
import { API } from "../api/api";

const setAuthToken = async (token: string | null) => {
  if (token) {
    // Apply to every request
    API.defaults.headers.common["Authorization"] = await `Bearer ${token}`;
    localStorage.setItem("token", token);
    //console.log(axios.defaults.headers.common['Authorization']);
  } else {
    // Delete auth header
    await delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
