import useTranslation from 'next-translate/useTranslation';
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	IActivities,
	INotificationList,
	IEmployee,
	IHistoryNotification,
	ISocialMedia,
} from 'types';
import { historyNotifications } from 'components';
import { mainClient, navigationPaths } from 'utils';
import { useAccount } from 'wagmi';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';
import router, { useRouter } from 'next/router';

interface ICompanyContext {
	activities: IActivities[];
	notificationsList: INotificationList[];
	setNotificationsList: Dispatch<SetStateAction<INotificationList[]>>;
	setSelectedCompany: Dispatch<SetStateAction<ICompany>>;
	setEditedInfo: Dispatch<SetStateAction<ICompany>>;
	editedInfo: ICompany;
	displayMissingFundsWarning: string;
	setDisplayMissingFundsWarning: Dispatch<SetStateAction<string>>;
	displayNeedFundsCard: string;
	setDisplayNeedFundsCard: Dispatch<SetStateAction<string>>;
	filteredNotifications: IHistoryNotification[];
	setFilteredNotifications: Dispatch<SetStateAction<IHistoryNotification[]>>;
	getAllUserCompanies: () => Promise<ICompany[]>;
	createCompany: (company: ICompany) => Promise<void>;
	socialMediasData: ISocialMedia[];
	setSocialMediasData: Dispatch<SetStateAction<ISocialMedia[]>>;
	getCompanyById: (id: number) => Promise<ICompany>;
	updateCompany: (company: ICompany) => Promise<void>;
	getAllCompanyEmployees: (id: number) => Promise<IEmployee[]>;
	allUserCompanies: GetUserCompaniesRes[];
	selectedCompany: ICompany;
	companiesWithMissingFunds: GetUserCompaniesRes[];
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { t: translate } = useTranslation('companies');
	const { address: wallet } = useAccount();
	const [displayMissingFundsWarning, setDisplayMissingFundsWarning] =
		useState('none');
	const [displayNeedFundsCard, setDisplayNeedFundsCard] = useState('none');
	const [socialMediasData, setSocialMediasData] = useState<ISocialMedia[]>([]);
	const [allUserCompanies, setAllUserCompanies] = useState<
		GetUserCompaniesRes[]
	>([]);
	const [selectedCompany, setSelectedCompany] = useState<ICompany>(
		{} as ICompany
	);
	const neededFunds = 0;
	const { query } = useRouter();

	const [companiesWithMissingFunds, setCompaniesWithMissingFunds] = useState<
		GetUserCompaniesRes[]
	>([]);

	const [filteredNotifications, setFilteredNotifications] =
		useState<IHistoryNotification[]>(historyNotifications);

	const [notificationsList, setNotificationsList] = useState<
		INotificationList[]
	>([
		{
			type: 'You made a deposit of $23,456.02',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'You created Kylie Cosmetics',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: '0x6856...BF99 added to Kylie Baby',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
	]);
	const [activities, setActivities] = useState<IActivities[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'Deposit',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: translate('completed'),
			value: 100063,
		},
		{
			name: 'Kylie Skin',
			type: 'Withdrawal',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: translate('completed'),
			value: 19636,
		},
		{
			name: 'Kylie Baby',
			type: 'Team Created',
			coin: 'USDT',
			date: '08 Aug 22, 20:57',
			status: translate('completed'),
			value: 10,
		},
	]);

	const [editedInfo, setEditedInfo] = useState<ICompany>({} as ICompany);

	const getAllUserCompanies = async () => {
		const response = await mainClient.get(`/user/${wallet}/company`);
		setAllUserCompanies(response.data);
		return response.data;
	};

	const handleMissingFunds = () => {
		allUserCompanies.forEach(companie => {
			if (companie.revenue! < neededFunds) {
				setCompaniesWithMissingFunds(prevState => prevState.concat(companie));
			}
		});
	};
	useEffect(() => {
		handleMissingFunds();
	}, [allUserCompanies]);

	useEffect(() => {
		if (companiesWithMissingFunds.length) {
			setDisplayMissingFundsWarning('flex');
		} else {
			setDisplayMissingFundsWarning('none');
		}
	}, [companiesWithMissingFunds]);

	const getCompanyById = async (id: number) => {
		const response = await mainClient.get(`/company/${id}`);
		setSelectedCompany(response.data);
		return response.data;
	};

	useEffect(() => {
		if (selectedCompany.totalFundsUsd! < neededFunds) {
			setDisplayNeedFundsCard('flex');
		} else setDisplayNeedFundsCard('none');
	}, [selectedCompany]);

	const createCompany = async (company: ICompany) => {
		await mainClient
			.post('/company/', {
				company,
			})
			.then(id =>
				router.push(
					navigationPaths.dashboard.companies.overview(id.data.id.toString())
				)
			);
	};

	const updateCompany = async (company: ICompany) => {
		await mainClient
			.put(`/company/${Number(query.id)}`, {
				company,
			})
			.then(id =>
				router.push(navigationPaths.dashboard.companies.overview(query.id))
			);
	};
	const getAllCompanyEmployees = async (id: number) => {
		const response = await mainClient.get(`/company/${id}/users`);
		return response.data;
	};

	const contextStates = useMemo(
		() => ({
			activities,
			notificationsList,
			setNotificationsList,
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
			displayNeedFundsCard,
			setDisplayNeedFundsCard,
			companiesWithMissingFunds,
			filteredNotifications,
			setFilteredNotifications,
			getAllUserCompanies,
			createCompany,
			socialMediasData,
			setSocialMediasData,
			getCompanyById,
			setSelectedCompany,
			getAllCompanyEmployees,
			allUserCompanies,
			selectedCompany,
			updateCompany,
		}),
		[
			selectedCompany,
			activities,
			notificationsList,
			editedInfo,
			displayMissingFundsWarning,
			displayNeedFundsCard,
			companiesWithMissingFunds,
			filteredNotifications,
			socialMediasData,
			allUserCompanies,
			setSocialMediasData,
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
