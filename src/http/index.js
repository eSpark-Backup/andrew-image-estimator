import axios from 'axios';

export const baseURL = "http://127.0.0.1:8000";

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
        reject(err);
      });
  });
};

export default http;
