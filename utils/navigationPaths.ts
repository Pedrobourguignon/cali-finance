export const navigationPaths = {
	landing: '/',
	faq: '/faq',
	docs: '/docs',
	about: '/about',
	help: '/help',
	termsAndConditions: '/terms-and-conditions',
	dashboard: {
		home: '/app',
		editProfile: '/app/edit-profile',
		history: '/app/history',
		companies: {
			home: '/app/companies',
			createOrg: '/app/companies/create',
			overview: (companyId: string) => `/app/companies/${companyId}`,
			teams: (companyId: string) => `/app/companies/${companyId}/teams`,
			funds: (companyId: string) => `/app/companies/${companyId}/funds`,
			editOrg: (companyId: string) => `/app/companies/${companyId}/edit`,
			team: (companyId: string, teamId: string) =>
				`/app/companies/${companyId}/teams/${teamId}`,
		},
	},
};
