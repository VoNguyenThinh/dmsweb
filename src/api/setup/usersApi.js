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
    getUserIfo: () => {
        const url = '/users/userview';
        return axiosClient.get(url);
    },
    changePwd: (body) => {
        const url = '/users/changepassword';
        return axiosClient.put(url, body);
    },
    changeIfo: (body) => {
        const url = '/users/userupdate';
        return axiosClient.put(url, body);
    },
}


export default userApi;