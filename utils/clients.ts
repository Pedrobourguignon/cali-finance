import axios from 'axios';
import { API_URLS } from 'helpers';
import { getCookie } from 'cookies-next';

export const checkJwt = () => {
	const jwt = getCookie('cali-finance-authorization');
	return jwt ? `Bearer ${jwt}` : false;
};

export const authClient = axios.create({
	baseURL: API_URLS.auth,
	withCredentials: false,
});

export const coinClient = axios.create({
	baseURL: API_URLS.main,
	withCredentials: false,
});

export const mainClient = axios.create({
	baseURL: API_URLS.main,
	withCredentials: false,
});

mainClient.defaults.headers.common.Authorization = checkJwt();
