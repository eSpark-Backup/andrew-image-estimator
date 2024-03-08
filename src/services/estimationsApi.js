import http from "../http";

export const createEstimationApi = (payload) => {
  return new Promise((resolve, reject) => {
    http(`/api/create_est/`, "post", payload, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllEstimationsApi = () => {
  return new Promise((resolve, reject) => {
    http(`/api/home/`, "get", null, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteEstimationsApi = (id) => {
  return new Promise((resolve, reject) => {
    http(`/api/home/?id=${id}`, "delete", null, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
