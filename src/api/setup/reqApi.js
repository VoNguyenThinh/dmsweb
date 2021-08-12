import axiosClient from "./axiosclient";

const reqAPI = {
    getAll: () => {
        const url = '/request/list';
        return axiosClient.get(url);
    },
    creatReq: (body) => {
        const url = '/request/create';
        return axiosClient.post(url, body);
    },
    acceptReq: (body) => {
        const url = '/request/handle';
        return axiosClient.post(url, body);
    },
    giveBack: (body) => {
        const url = '/request/giveback';
        return axiosClient.post(url, body);
    },
    getAccepted: () => {
        const url = '/request/engagementlist';
        return axiosClient.get(url);
    },
}
export default reqAPI;