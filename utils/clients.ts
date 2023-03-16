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
	baseURL: API_URLS.coin,
	withCredentials: false,
});

export const mainClient = axios.create({
	baseURL: API_URLS.main,
	withCredentials: false,
});

mainClient.defaults.headers.common.Authorization = checkJwt();
// mainClient.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIweDE3MThlYWEzYWE2YmVjYmI3YWY1YjU3ZWZhMjdmNzNlNjlhMTA3YTUiLCJleHAiOjE2Nzc1ODYyOTAsImlhdCI6MTY3NzQ5OTg5MH0.TIDK4qnv5td9hWlCNfhYYxfH2yYo-UcYfWvjhpGiFiY`;
