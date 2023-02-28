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
			overview: (companyId: string | null) => `/app/companies/${companyId}`,
			teams: (companyId: string | null) => `/app/companies/${companyId}/teams`,
			funds: (companyId: string | null) => `/app/companies/${companyId}/funds`,
			editOrg: (companyId: string | null) => `/app/companies/${companyId}/edit`,
			team: (companyId: string | null, teamId: string | null) =>
				`/app/companies/${companyId}/teams/${teamId}`,
		},
	},
};
