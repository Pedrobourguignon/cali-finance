/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
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
	IEmployee,
	IHistoryNotification,
	ISocialMedia,
	INewEmployee,
	IEditedEmployeeInfo,
	INotificationList,
	IUseBalance,
} from 'types';
import { historyNotifications } from 'components';
import { mainClient, navigationPaths } from 'utils';
import { useQuery } from 'react-query';
import { useAccount, useBalance } from 'wagmi';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';
import router, { useRouter } from 'next/router';
import { MAIN_SERVICE_ROUTES } from 'helpers';
import { useTokens } from 'hooks';

interface ICompanyContext {
	activities: IActivities[];
	notificationsList: {
		type: string;
		date: string;
		icon: string;
	}[];
	setNotificationsList: Dispatch<
		SetStateAction<
			{
				type: string;
				date: string;
				icon: string;
			}[]
		>
	>;
	setSelectedCompany: Dispatch<SetStateAction<ICompany>>;
	setEditedInfo: Dispatch<SetStateAction<ICompany>>;
	editedInfo: ICompany;
	displayMissingFundsWarning: string;
	setDisplayMissingFundsWarning: Dispatch<SetStateAction<string>>;
	displayNeedFundsCard: string;
	setDisplayNeedFundsCard: Dispatch<SetStateAction<string>>;
	filteredNotifications: IHistoryNotification[];
	setFilteredNotifications: Dispatch<SetStateAction<IHistoryNotification[]>>;
	getAllUserCompanies: () => Promise<GetUserCompaniesRes[]>;
	createCompany: (company: ICompany) => Promise<void>;
	socialMediasData: ISocialMedia[];
	setSocialMediasData: Dispatch<SetStateAction<ISocialMedia[]>>;
	getCompanyById: (id: number) => Promise<ICompany>;
	updateCompany: (company: ICompany) => Promise<void>;
	getAllCompanyEmployees: (id: number) => Promise<IEmployee[]>;
	addEmployeeToTeam: (employee: INewEmployee) => Promise<void>;
	allUserCompanies: GetUserCompaniesRes[];
	selectedCompany: ICompany;
	totalCompanyBalanceInDolar: number;
	companiesWithMissingFunds: GetUserCompaniesRes[];
	getCompanieActivities: (companyId: number) => Promise<INotificationList[]>;
	getAllCompanyTeams: (id: number) => Promise<any>;
	getAllCompaniesUserActivities: () => Promise<INotificationList[]>;
	addEmployeeCsv: (
		employee: string | undefined | null | ArrayBuffer
	) => Promise<void>;
	updateEmployee: (
		editedEmployeeInfo: IEditedEmployeeInfo,
		teamId: number
	) => Promise<void>;
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { query } = useRouter();
	const { getCoinServiceTokens } = useTokens();
	const { t: translate } = useTranslation('companies');
	const { address: wallet } = useAccount();
	const [displayNeedFundsCard, setDisplayNeedFundsCard] = useState('none');
	const [socialMediasData, setSocialMediasData] = useState<ISocialMedia[]>([]);
	const [editedInfo, setEditedInfo] = useState<ICompany>({} as ICompany);
	const [allUserCompanies, setAllUserCompanies] = useState<
		GetUserCompaniesRes[]
	>([]);
	const [selectedCompany, setSelectedCompany] = useState<ICompany>(
		{} as ICompany
	);
	const [displayMissingFundsWarning, setDisplayMissingFundsWarning] =
		useState('none');
	const [companiesWithMissingFunds, setCompaniesWithMissingFunds] = useState<
		GetUserCompaniesRes[]
	>([]);
	const [filteredNotifications, setFilteredNotifications] =
		useState<IHistoryNotification[]>(historyNotifications);

	const neededFunds = 0;

	const [notificationsList, setNotificationsList] = useState([
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
				router.push(navigationPaths.dashboard.companies.overview(query.id!))
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

	const updateEmployee = async (
		editedEmployeeInfo: IEditedEmployeeInfo,
		teamId: number
	) => {
		await mainClient.put(`/team/${teamId}/user`, editedEmployeeInfo);
	};

	const getCompanieActivities = async (companyId: number) => {
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.companyRecentActivities(companyId),
			{
				params: {
					pageLimit: 9,
				},
			}
		);
		return response.data;
	};

	const getAllCompaniesUserActivities = async () => {
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.allCompaniesUserActivities(),
			{
				params: {
					pageLimit: 300,
				},
			}
		);
		return response.data;
	};

	const [totalCompanyBalanceInDolar, setTotalCompanyBalanceInDolar] =
		useState<number>(-1);
	const contractCompanyAssetsData: IUseBalance[] = [];
	const companyAssetsDolarQuotation: number[] = [];

	// the address is hardcoded, need update before the event watcher implemented
	const { data: companyBalance, refetch } = useBalance({
		address: '0x8409809BdF2424C45Fb85DB7768daC6026e95602',
	});

	// run the useBalance hook every 20 seconds
	useEffect(() => {
		const refetchBalanceTimer = setInterval(() => {
			refetch();
		}, 5000);
		return () => clearInterval(refetchBalanceTimer);
	}, []);

	if (companyBalance) {
		contractCompanyAssetsData.push(companyBalance);
	}

	const { data: companyAssetsInDolar } = useQuery('get-coin-data', () =>
		getCoinServiceTokens(
			contractCompanyAssetsData.map(asset => asset.symbol).toString()
		)
	);

	useEffect(() => {
		// get the value of the quotation of all assets in the company's contract and put in an array
		if (companyAssetsInDolar) {
			for (const key in companyAssetsInDolar) {
				if (companyAssetsInDolar.hasOwnProperty(key)) {
					companyAssetsDolarQuotation.push(companyAssetsInDolar[key]?.value);
				}
			}
			// maps the array of assets and the array of quotes, multiplying the respective index
			// sum all values and set the final dolar balance state to show in the company header
			const multiplyAssetsToDolar = () => {
				const dolarValues = contractCompanyAssetsData.map(asset =>
					companyAssetsDolarQuotation.map(
						assetQuotation => Number(asset.formatted) * assetQuotation
					)
				);
				const sumAllDolarValues = dolarValues[0].reduce(
					(partialSum, acc) => partialSum + acc,
					0
				);
				setTotalCompanyBalanceInDolar(sumAllDolarValues);
			};
			multiplyAssetsToDolar();
		}
	}, [contractCompanyAssetsData]);

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
			updateEmployee,
			allUserCompanies,
			selectedCompany,
			updateCompany,
			getCompanieActivities,
			getAllCompanyTeams,
			getAllCompaniesUserActivities,
			totalCompanyBalanceInDolar,
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
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
