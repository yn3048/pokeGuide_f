import axios from 'axios';
import { RootUrl } from './RootUrl';


const rootURL = RootUrl + '/admin';

export const postUserList = async () => {

    const response = await axios.post(`${rootURL}/userList`);

    return response.data;
};

export const getUserDel = async () => {

    const response = await axios.get(`${rootURL}/allUserDel`);

    return response.data;
};

export const postChangeRole = async (data) => {

    const response = await axios.post(`${rootURL}/changeRole`,data);

    return response.data;
};



export const deleteUser = async (data) => {

    const response = await axios.get(`${rootURL}/delUser?uid=${data}`);

    return response.data;
};



export const userStop = async (data) => {

    const response = await axios.get(`${rootURL}/userStop?uid=${data}`);

    return response.data;
};

