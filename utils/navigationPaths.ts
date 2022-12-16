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
			overview: (id: string) => `/app/organizations/${id}`,
			teams: '/app/organizations/teams',
			funds: '/app/organizations/funds',
			editOrg: '/app/organizations/edit',
		},
	},
};
