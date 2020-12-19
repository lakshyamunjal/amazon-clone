import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-155e6/us-central1/api',        // this URL is generated when firebase is executed on Local Machine
    // API(cloud function) url
});

export default instance;