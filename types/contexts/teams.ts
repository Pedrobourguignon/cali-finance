export interface IEmployeeData {
	name: string;
	address: string;
	group: {
		name: string;
		color: string;
	};
	amount: number;
	withdrawable: number;
	coin: string;
}

export interface ITeamsData {
	id: number;
	name: string;
	balance: number;
	employees: IEmployeeData[];
}
