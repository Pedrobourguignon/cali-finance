import { Dispatch, SetStateAction } from 'react';
import { IEmployee } from 'types';

export interface IAddEmployee {
	isOpen: boolean;
	onClose: () => void;
	company: string;
	setEmployees: Dispatch<SetStateAction<IEmployee[]>>;
}
