export interface IRecentActivitiesList {
	type: string;
	date: string;
	value: string;
	status: string;
}

export interface IRecentActivitiesComponent {
	recentActivitiesList: IRecentActivitiesList[];
}
