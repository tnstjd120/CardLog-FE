import axios from "axios";
import { getCookie } from "utils/cookie/universal-cookie";

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const params = new URLSearchParams(window.location.search);
const blogId = params.get("blog_id");

export const api = axios.create({
  baseURL: API_BASE_URL || "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  return {
    ...config,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  };
});

export const accessApi = axios.create({
  baseURL: API_BASE_URL || "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

accessApi.interceptors.request.use((config: any) => {
  const accessToken = getCookie("access");

  return {
    ...config,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
});
