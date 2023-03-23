import axios from "axios";
import { useSelector } from "react-redux";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config: any) => {
//   const accessToken = useSelector((state) => state);

//   console.log(accessToken);

//   return {
//     ...config,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   };
// });

export default api;
