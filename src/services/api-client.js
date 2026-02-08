import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://lancer-brown.vercel.app/api/",
});

export default apiClient; 