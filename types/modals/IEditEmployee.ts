import { IEmployee } from 'types';

export interface IEditEmployee {
	employee: IEmployee;
	isOpen: boolean;
	onClose: () => void;
}
