import { WithdrawalIcon, AvatarIcon, DepositIcon } from 'components';
import { IHistoryNotification } from 'types';

export const historyNotifications: IHistoryNotification[] = [
	{
		companyIcon: AvatarIcon,
		company: 'Company Name',
		userWalletAddress: '0x6856...DW85',
		userTeam: 'Sales Team',
		userIcon: AvatarIcon,
		type: 'Withdrawal',
		typeIcon: WithdrawalIcon,
		date: '08 Aug 22, 20:57',
		value: '10,000 USDT',
		status: 'Completed',
	},
	{
		companyIcon: AvatarIcon,
		company: 'Company Name',
		userWalletAddress: '0x6856...DW85',
		userTeam: 'Sales Team',
		userIcon: AvatarIcon,
		type: 'Deposit',
		typeIcon: DepositIcon,
		date: '08 Aug 22, 20:57',
		value: '10,000 USDT',
		status: 'Pending',
	},
];

export default historyNotifications;
