    import axios from "axios";

const instance = axios.create({
    baseURL: 'https://bachkhoi.online',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    timeout: 20000,
});

export default instance;
