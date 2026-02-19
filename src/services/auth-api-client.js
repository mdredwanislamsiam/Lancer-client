import axios from "axios";

const authAPIClient = axios.create({
	baseURL: "https://lancer-brown.vercel.app/api/",
	// baseURL: "http://127.0.0.1:8000/api/",
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