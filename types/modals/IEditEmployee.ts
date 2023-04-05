import { GetCompanyUsersRes } from 'types/interfaces/main-server/IUser';

export interface IEditEmployee {
	employee: GetCompanyUsersRes;
	isOpen: boolean;
	onClose: () => void;
}
