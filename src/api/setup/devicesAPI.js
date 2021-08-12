import axiosClient from "./axiosclient";


const devicesAPI = {
    getAll: (params) => {
        const url = '/devices/manage/list';
        return axiosClient.get(url, { params });
    },
    addDevice: (body) => {
        const url = '/devices/manage/adddevices';
        return axiosClient.post(url, body);
    },
    ViewDevice: (id) => {
        const url = '/devices/manage/viewdevice/';

        return axiosClient.get(url + id);
    },
    editDevice: (body) => {
        const url = '/devices/manage/updatedevice';
        return axiosClient.post(url, body);
    },
}
export default devicesAPI;