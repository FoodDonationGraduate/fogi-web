import axios from "axios";

const instance = axios.create({
    baseURL: 'https://bachkhoi.online',
    timeout: 20000,
});

export default instance;

export const ggApiInstance = axios.create({
    baseURL: 'https://maps.googleapis.com',
    timeout: 20000,
});
