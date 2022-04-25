import axios from "axios";

const BASE_URL = " https://memories-toggle-backend.herokuapp.com/api/v1";

export const API = axios.create({
  baseURL: BASE_URL,
});
