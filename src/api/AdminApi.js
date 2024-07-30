import axios from 'axios';
import { RootUrl } from './RootUrl';


const rootURL = RootUrl + '/admin';

export const postUserList = async () => {

    const response = await axios.post(`${rootURL}/userList`);

    return response.data;
};