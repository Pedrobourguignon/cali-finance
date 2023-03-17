export const navigationPaths = {
	landing: '/',
	faq: '/faq',
	docs: '/docs',
	about: '/about',
	help: '/help',
	termsAndConditions: '/terms-and-conditions',
	dashboard: {
		home: '/dashboard',
		editProfile: '/edit-profile',
		history: '/history',
		companies: {
			home: '/companies',
			createOrg: '/companies/create',
			overview: (companyId: string) => `/companies/${companyId}`,
			teams: (companyId: string) => `/companies/${companyId}/teams`,
			funds: (companyId: string) => `/companies/${companyId}/funds`,
			editOrg: (companyId: string) => `/companies/${companyId}/edit`,
			team: (companyId: string, teamId: string) =>
				`/companies/${companyId}/teams/${teamId}`,
		},
	},
};
