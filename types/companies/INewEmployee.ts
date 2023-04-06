import { GetCompanyUsersRes } from 'types/interfaces/main-server/IUser';

export interface INewEmployee extends GetCompanyUsersRes {
	userAddress: `0x${string}` | undefined;
}
