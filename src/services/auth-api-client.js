import axios from "axios";

const authAPIClient = axios.create({
	baseURL: "https://lancer-brown.vercel.app/api/",
}); 

export default authAPIClient; 

authAPIClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authTokens");
        if (token) {
            config.headers.Authorization = `JWT ${JSON.parse(token)?.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);