import axiosClient from "./axiosclient";

const userApi = {
    getAll: (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
    post: (body) => {
        const url = '/users/loginapi';
        return axiosClient.post(url, body);
    }
}


export default userApi;