export interface IRecentActivitiesList {
	type: () => void;
	date: string;
	value: string;
	status: () => void;
}

export interface IRecentActivitiesComponent {
	recentActivitiesList: IRecentActivitiesList[];
}
