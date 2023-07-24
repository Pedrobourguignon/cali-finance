import axios from 'axios';
import { API_URLS } from 'helpers';
import { getCookie } from 'cookies-next';

export const authClient = axios.create({
	baseURL: `${API_URLS.main}/auth`,
	withCredentials: false,
});

export const coinClient = axios.create({
	baseURL: `${API_URLS.main}/coin`,
	withCredentials: false,
});

export const mainClient = axios.create({
	baseURL: API_URLS.main,
	withCredentials: false,
});

export const checkJwt = (jwt?: string) => {
	const token = jwt || getCookie('cali-finance-authorization');
	mainClient.defaults.headers.common.Authorization = `Bearer ${token}`;
	authClient.defaults.headers.common.Authorization = `Bearer ${token}`;
	coinClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};
