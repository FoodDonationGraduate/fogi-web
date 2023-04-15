    import axios from "axios";

const instance = axios.create({
    baseURL: 'https://bachkhoi.online',
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 20000,
});

export default instance;
