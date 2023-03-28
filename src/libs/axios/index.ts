import axios from "axios";
import { getCookie } from "utils/cookie/universal-cookie";

// const accessToken = getCookie("access");

export const api = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const accessApi = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${getCookie("access")}`,
  },
});

// accessApi.interceptors.request.use((config: any) => {
//   const accessToken = getCookie("access");

//   return {
//     ...config,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };
// });
