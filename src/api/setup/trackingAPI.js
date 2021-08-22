import axiosClient from "./axiosclient";


const trackingAPI = {
    getAll: () => {
        const url = '/request/tracking';
        return axiosClient.get(url);
    },
    trackingBytime: (body) => {
        const url = '/request/tracking';
        return axiosClient.post(url, body);
    },
    TrakingUser: () => {
        const url = '/users/usertracking';
        return axiosClient.get(url);
    },
}
export default trackingAPI;