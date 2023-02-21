import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: false,
});

export { apiClient };
