import axios from 'axios';
import { constants } from './constants';

const instance = axios.create({
    baseURL: constants.firebaseURL,        // this URL is generated when firebase is executed on Local Machine
    // API(cloud function) url
});

export default instance;