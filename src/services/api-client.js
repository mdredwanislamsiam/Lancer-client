import axios from "axios";

const apiClient = axios.create({
	// baseURL: "https://lancer-brown.vercel.app/api/",
	baseURL: "http://127.0.0.1:8000/api/",
});

export default apiClient; 