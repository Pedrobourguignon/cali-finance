export interface IEditEmployee {
	employeeName: string;
	employeeWalletAddress: string;
	isOpen: boolean;
	onClose: () => void;
}
