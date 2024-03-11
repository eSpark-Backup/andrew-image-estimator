import axios from "axios";
import http from "../http";

function setSession(data) {
  const accessToken = data?.token;
  const user = data?.user_data
  if (accessToken) {
    window.localStorage.setItem("token", accessToken);
    window.localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
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
        setSession(res?.data);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
  delete axios.defaults.headers.common.Authorization;
  window.location.reload();
};
