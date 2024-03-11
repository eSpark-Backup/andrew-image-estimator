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

export const getEstimationById = (id) => {
  return new Promise((resolve, reject) => {
    http(`/api/edit/?id=${id}`, "get", null, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateEstimationById = (id, body) => {
  return new Promise((resolve, reject) => {
    http(`/api/update_est/?id=${id}`, "patch", body, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createEstimationFromById = (body) => {
  return new Promise((resolve, reject) => {
    http(`/api/est_details/`, "post", body, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getEstimationFromById = (id) => {
  return new Promise((resolve, reject) => {
    http(`/api/est_details/?est_id=${id}`, "get", null, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};