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
		organizations: {
			home: '/app/organizations',
			createOrg: '/app/organizations/create',
			overview: (companyId: string) => `/app/organizations/${companyId}`,
			teams: (companyId: string) => `/app/organizations/${companyId}/teams`,
			funds: (companyId: string) => `/app/organizations/${companyId}/funds`,
			editOrg: (companyId: string) => `/app/organizations/${companyId}/edit`,
			team: (companyId: string, teamId: string) =>
				`/app/organizations/${companyId}/teams/${teamId}`,
		},
	},
};
