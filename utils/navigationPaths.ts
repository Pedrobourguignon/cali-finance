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
			overview: (companyId: string | string[] | undefined) =>
				`/companies/${companyId}`,
			teams: (companyId: string | string[] | undefined) =>
				`/companies/${companyId}/teams`,
			funds: (companyId: string | string[] | undefined) =>
				`/companies/${companyId}/funds`,
			editOrg: (companyId: string | string[] | undefined) =>
				`/companies/${companyId}/edit`,
			team: (
				companyId: string | string[] | undefined,
				teamId: string | string[] | undefined
			) => `/companies/${companyId}/teams/${teamId}`,
		},
	},
};
