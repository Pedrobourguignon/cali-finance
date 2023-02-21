import axios from 'axios';

const baseURL = 'await .env setting';
const apiClient = axios.create({
	baseURL,
	withCredentials: false,
});

export { apiClient };
