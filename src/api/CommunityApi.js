import axios from 'axios';
import { RootUrl } from './RootUrl';


const rootURL = RootUrl + '/community';

export const ArticleReg = async (data) => {

    const response = await axios.post(`${rootURL}/register`, data);

    return response.data;
};


export const ArticleList = async (data) => {

    const response = await axios.post(`${rootURL}/list`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};

export const getContent = async (data) => {

    const response = await axios.get(`${rootURL}/view?ano=${data}`);

    return response.data;
};

