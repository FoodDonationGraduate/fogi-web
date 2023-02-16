import axios from "axios";

const instance = axios.create({
    baseURL: 'http://fogi.com',
    headers: {
        "Content-Type": "application/json"
    }
});

export default instance;
