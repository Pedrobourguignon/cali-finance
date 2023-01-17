import { IEmployee } from 'types/organizations';

export interface IEditEmployee {
	employee: IEmployee;
	isOpen: boolean;
	onClose: () => void;
}
