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
	INewEmployee,
	IMockCompany,
} from 'types';
import { historyNotifications } from 'components';
import { mainClient, navigationPaths } from 'utils';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';
import router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { MAIN_SERVICE_ROUTES } from 'helpers';

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
	addEmployeeToTeam: (employee: INewEmployee) => Promise<void>;
	addEmployeeCsv: (
		employee: string | undefined | null | ArrayBuffer
	) => Promise<void>;
	allUserCompanies: GetUserCompaniesRes[];
	selectedCompany: ICompany;
	companiesWithMissingFunds: GetUserCompaniesRes[];
	companies: IMockCompany[];
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

	const [companies, setCompanies] = useState<IMockCompany[]>([
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kyliecosmetics',
				telegram: 't/kyliecosmetics',
				twitter: 'twitter.com/kyliecosmetics',
				website: 'kyliecosmetics.net',
			},
			funds: 999,
			neededFunds: 2,
		},
		{
			name: 'Kylie Skin',
			type: 'DAO',
			email: 'kylieskin@gmail.com',
			members: 170,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kylieskin',
				telegram: 't/kylieskin',
				twitter: 'twitter.com/kylieskin',
				website: 'kylieskin.net',
			},
			funds: 999,
			neededFunds: 2,
		},
		{
			name: 'Kylie Baby',
			type: 'DAO',
			email: 'kyliebaby@gmail.com',
			members: 13,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kyliebaby',
				telegram: 't/kyliebaby',
				twitter: 'twitter.com/kyliebaby',
				website: 'kyliebaby.net',
			},
			funds: 5234.11,
			neededFunds: 1,
		},
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kyliecosmetics',
				telegram: 't/kyliecosmetics',
				twitter: 'twitter.com/kyliecosmetics',
				website: 'kyliecosmetics.net',
			},
			funds: 999,
			neededFunds: 2,
		},
		{
			name: 'Kylie Cosmetics',
			type: 'DAO',
			email: 'kyliecosmetics@gmail.com',
			members: 2,
			teams: ['marketing'],
			description: 'Hello',
			selectedNetwork: 'Ethereum',
			picture: '',
			socialMedias: {
				instagram: '@kyliecosmetics',
				telegram: 't/kyliecosmetics',
				twitter: 'twitter.com/kyliecosmetics',
				website: 'kyliecosmetics.net',
			},
			funds: 999,
			neededFunds: 2,
		},
	]);

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
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.allUserCompanies(wallet)
		);
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
			.post(MAIN_SERVICE_ROUTES.createCompany, {
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
			.put(MAIN_SERVICE_ROUTES.updateCompany(Number(query.id)), {
				company,
			})
			.then(id =>
				router.push(navigationPaths.dashboard.companies.overview(query.id))
			);
	};
	const getAllCompanyEmployees = async (id: number) => {
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.allCompanyEmployees(id)
		);
		return response.data;
	};

	const getAllCompanyTeams = async (id: number) => {
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.allCompanyTeams(id)
		);
		return response.data;
	};

	const { data: teams } = useQuery(
		'all-company-teams',
		() => getAllCompanyTeams(Number(query.id)),
		{
			enabled: !!query.id,
		}
	);

	const addEmployeeToTeam = async (employee: INewEmployee) => {
		const { id } = teams[0];
		const groupId = 1;
		await mainClient.post(
			MAIN_SERVICE_ROUTES.addEmployee(id, groupId),
			employee
		);
	};

	const addEmployeeCsv = async (
		employee: string | undefined | null | ArrayBuffer
	) => {
		const { id } = teams[0];
		const groupId = 1;
		await mainClient.post(
			MAIN_SERVICE_ROUTES.addCsvEmployee(id, groupId),
			employee,
			{
				headers: { 'Content-Type': 'text/plain' },
			}
		);
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
			addEmployeeToTeam,
			addEmployeeCsv,
			allUserCompanies,
			selectedCompany,
			updateCompany,
			companies,
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
			updateCompany,
			companies,
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
