import axios from "axios";
import { logout } from "../services/authApi";

export const baseURL = import.meta.env.VITE_BASE_URL;

const http = (url, type, body, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.localStorage.getItem("token")) {
        axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem(
          "token"
        )}`;
      }
      axios[type](`${baseURL}${url}`, body)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            logout();
          }
          reject(err);
        });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export default http;
