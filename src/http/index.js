import axios from 'axios';
import { logout } from '../services/authApi';

export const baseURL = import.meta.env.VITE_BASE_URL;

const http = (url, type, body, token) => {
  return new Promise((resolve, reject) => {
    axios[type](
      `${baseURL}${url}`,
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,}
          }
        : body
    )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if(err?.response?.data?.detail === "Authentication credentials were not provided."){
            logout()
        }
        reject(err);
      });
  });
};

export default http;
