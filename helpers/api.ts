const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_URLS = {
	auth: `${BASE_URL}/auth`,
	main: `${BASE_URL}`,
};

function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

export const AUTH_SERVICE_ROUTES = {
	nonce: (wallet: string) => path(API_URLS.auth, `/${wallet}/auth-message`),
	signature: path(API_URLS.auth, `/`),
};

export const MAIN_SERVICE_ROUTES = {
	createCompany: path(API_URLS.main, '/company/'),
	allUserCompanies: (wallet: string) =>
		path(API_URLS.main, `user/${wallet}/company`),
	updateCompany: (id: number) => path(API_URLS.main, `company/${id}`),
	allCompanyEmployees: (id: number) =>
		path(API_URLS.main, `company/${id}/users`),
	allCompanyTeams: (id: number) => path(API_URLS.main, `/company/${id}/teams`),
	addEmployee: (id: number, groupId: number) =>
		path(API_URLS.main, `/team/${id}/${groupId}/user`),
	addCsvEmployee: (id: number, groupId: number) =>
		path(API_URLS.main, `/team/${id}/${groupId}/users`),
	profileData: (wallet: string) => path(API_URLS.main, `/user/${wallet}`),
	userSettings: (wallet: string) =>
		path(API_URLS.main, `/user/${wallet}/settings`),
};
