import axios from 'axios';
import { RootUrl } from './RootUrl';


const rootURL = RootUrl + '/community';

export const ArticleReg = async (data) => {

    const response = await axios.post(`${rootURL}/register`, data);

    return response.data;
};