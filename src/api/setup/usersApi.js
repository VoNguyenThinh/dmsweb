import axiosClient from "./axiosclient";

const userApi = {
    getAll: () => {
        const url = '/users/list';
        return axiosClient.get(url);
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
    updateUser: (body) => {
        const url = '/users/manage/updateuser';
        return axiosClient.post(url, body);
    },
    addUser: (body) => {
        const url = '/users/manage/adduser';
        return axiosClient.post(url, body);
    },
    deleteUser: (body) => {
        const url = '/users/manage/deleteuser';
        return axiosClient.put(url, body);
    },
    ViewUser: (id) => {
        const url = '/users/manage/viewuser/';

        return axiosClient.get(url + id);
    },
    SearchUser: (params) => {
        const url = '/users/manage/search';
        return axiosClient.get(url, { params });
    },
}

export default userApi;