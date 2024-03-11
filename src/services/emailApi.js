import http from "../http";

export const sendEmailApi = ({ name, email, data }) => {
    const payload = {
        recipient_name: name,
        email,
        table: data
    };

    return new Promise((resolve, reject) => {
        http(`/api/email/`, "post", payload, null)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};