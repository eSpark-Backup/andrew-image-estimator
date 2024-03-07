import http from "../http";

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
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logout = () => {
    localStorage.clear("token")
}
