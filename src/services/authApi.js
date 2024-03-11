import axios from "axios";
import http from "../http";

function setSession(accessToken) {
  if (accessToken) {
    window.localStorage.setItem("token", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    window.location.reload();
  }
}

export const signUpApi = (payload) => {
  return new Promise((resolve, reject) => {
    http(`/api/sign_up/`, "post", payload, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginApi = (payload) => {
  return new Promise((resolve, reject) => {
    http(`/api/login/`, "post", payload, null)
      .then((res) => {
        setSession(res?.data?.token);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = () => {
  window.localStorage.removeItem("token");
  delete axios.defaults.headers.common.Authorization;
  window.location.reload();
};
