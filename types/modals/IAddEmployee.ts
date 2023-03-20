import { Dispatch, SetStateAction } from 'react';
import { IEmployee } from 'types';
import { ICompany } from 'types/interfaces/main-server/ICompany';

export interface IAddEmployee {
	isOpen: boolean;
	onClose: () => void;
	selectedCompany?: ICompany | undefined;
	setEmployees?: Dispatch<SetStateAction<IEmployee[]>>;
}
