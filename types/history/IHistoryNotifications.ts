export interface IHistoryNotifications {
	created_at: string;
	event: {
		description: string;
		name: string;
	};
	id: number;
	meta: {
		data: {
			companyId: number;
			companyName: string;
			event: string;
			teamId: number;
			userAddedWallet: string;
			userId: number;
		};
		description: {
			'en-US': string;
			'pt-BR': string;
		};
	};
}
