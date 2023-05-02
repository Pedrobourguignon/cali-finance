const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_URLS = {
	main: `${BASE_URL}`,
};

function path(base: string, url: string) {
	return new URL(url, base).href;
}

export const AUTH_SERVICE_ROUTES = {
	nonce: (wallet: string) =>
		path(API_URLS.main, `/auth/${wallet}/auth-message`),
	signature: path(API_URLS.main, `/auth/`),
};

export const MAIN_SERVICE_ROUTES = {
	createCompany: path(API_URLS.main, '/company/'),
	allUserCompanies: (wallet: string) =>
		path(API_URLS.main, `/user/${wallet}/company`),
	updateCompany: (id: number) => path(API_URLS.main, `/company/${id}`),
	allCompanyEmployees: (id: number) =>
		path(API_URLS.main, `/company/${id}/users`),
	allCompanyTeams: (id: number) => path(API_URLS.main, `/company/${id}/teams`),
	addEmployee: (id: number, groupId: number) =>
		path(API_URLS.main, `/team/${id}/${groupId}/user`),
	addCsvEmployee: (id: number, groupId: number) =>
		path(API_URLS.main, `/team/${id}/${groupId}/users`),
	userRecentActivities: path(API_URLS.main, '/user/recent-activity'),
	teamRecentActivities: (teamId: number) =>
		path(API_URLS.main, `/team/${teamId}/recent-activity`),
	companyRecentActivities: (companyId: number) =>
		path(API_URLS.main, `/team/${companyId}/recent-activity`),
	profileData: (wallet: string) => path(API_URLS.main, `/user/${wallet}`),
};
