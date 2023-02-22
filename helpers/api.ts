const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_URLS = {
	auth: `${BASE_URL}/auth`,
	main: `${BASE_URL}/main`,
	coin: `${BASE_URL}/coin`,
};

function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

export const AUTH_SERVICE_ROUTES = {
	nonce: (wallet: string) => path(API_URLS.auth, `/${wallet}/auth-message`),
	signature: path(API_URLS.auth, `/`),
};
