import axiosClient from "./axiosclient";

const loginApi = {
    post: (body) => {
        const url = '/users/loginapi';
        return axiosClient.post(url, body);
    }
}

export default loginApi;