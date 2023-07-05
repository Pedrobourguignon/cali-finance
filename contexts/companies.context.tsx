/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import {
	createContext,
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	IEmployee,
	ISocialMedia,
	INewEmployee,
	IEditedEmployeeInfo,
	IHistoryNotifications,
	IUseBalance,
} from 'types';
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
	setSelectedCompany: Dispatch<SetStateAction<GetUserCompaniesRes>>;
	setEditedInfo: Dispatch<SetStateAction<ICompany>>;
	editedInfo: ICompany;
	displayMissingFundsWarning: string;
	setDisplayMissingFundsWarning: Dispatch<SetStateAction<string>>;
	displayNeedFundsCard: string;
	setDisplayNeedFundsCard: Dispatch<SetStateAction<string>>;
	getAllUserCompanies: () => Promise<GetUserCompaniesRes[]>;
	createCompany: (company: ICompany) => Promise<void>;
	socialMediasData: ISocialMedia[];
	setSocialMediasData: Dispatch<SetStateAction<ISocialMedia[]>>;
	getCompanyById: (id: number) => Promise<ICompany>;
	updateCompany: (company: ICompany) => Promise<void>;
	getAllCompanyEmployees: (id: number) => Promise<IEmployee[]>;
	addEmployeeToTeam: (employee: INewEmployee) => Promise<void>;
	allUserCompanies: GetUserCompaniesRes[] | undefined;
	selectedCompany: GetUserCompaniesRes;
	totalCompanyBalanceInDollar: number;
	companiesWithMissingFunds: GetUserCompaniesRes[];
	getCompanieActivities: (
		companyId: number
	) => Promise<IHistoryNotifications[]>;
	getAllCompanyTeams: (id: number) => Promise<any>;
	getAllCompaniesUserActivities: () => Promise<IHistoryNotifications[]>;
	addEmployeeCsv: (
		employee: string | undefined | null | ArrayBuffer
	) => Promise<void>;
	updateEmployee: (
		editedEmployeeInfo: IEditedEmployeeInfo,
		teamId: number
	) => Promise<void>;
	getCompaniesOverview: () => Promise<{
		companies: number;
		members: number;
		totalFunds: number;
	}>;
	isLoadingCompanies: boolean;
	setAllUserBalance: Dispatch<SetStateAction<number[]>>;
	allUserBalance: number[];
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { query } = useRouter();
	const { getCoinServiceTokens } = useTokens();
	const { isConnected } = useAccount();
	const { address: wallet } = useAccount();
	const [displayNeedFundsCard, setDisplayNeedFundsCard] = useState('none');
	const [socialMediasData, setSocialMediasData] = useState<ISocialMedia[]>([]);
	const [editedInfo, setEditedInfo] = useState<ICompany>({} as ICompany);
	const [selectedCompany, setSelectedCompany] = useState<GetUserCompaniesRes>(
		{} as GetUserCompaniesRes
	);
	const [displayMissingFundsWarning, setDisplayMissingFundsWarning] =
		useState('none');
	const [companiesWithMissingFunds, setCompaniesWithMissingFunds] = useState<
		GetUserCompaniesRes[]
	>([]);
	const neededFunds = 0;
	const [allUserBalance, setAllUserBalance] = useState<number[]>([]);

	const getAllUserCompanies: () => Promise<
		GetUserCompaniesRes[]
	> = async () => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.allUserCompanies(wallet)
		);
		return response.data;
	};
	const { data: allUserCompanies, isLoading: isLoadingCompanies } = useQuery(
		['all-companies'],
		getAllUserCompanies,
		{
			enabled: !!isConnected,
		}
	);

	const getCompaniesOverview = async () => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(MAIN_SERVICE_ROUTES.getOverview);
		return response.data;
	};

	const handleMissingFunds = () => {
		if (allUserCompanies)
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

	const [totalCompanyBalanceInDollar, setTotalCompanyBalanceInDollar] =
		useState<number>(-1);
	const contractCompanyAssetsData: IUseBalance[] = [];
	const companyAssetsDollarQuotation: number[] = [];

	const { data: companyBalance, refetch } = useBalance({
		address: selectedCompany!.contract,
		enabled: selectedCompany !== undefined,
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

	const { data: companyAssetsInDollar } = useQuery(['get-coin-data'], () =>
		getCoinServiceTokens(
			contractCompanyAssetsData.map(asset => asset.symbol).toString()
		)
	);

	useEffect(() => {
		// get the value of the quotation of all assets in the company's contract and put in an array
		if (companyAssetsInDollar) {
			for (const key in companyAssetsInDollar) {
				if (companyAssetsInDollar.hasOwnProperty(key)) {
					companyAssetsDollarQuotation.push(companyAssetsInDollar[key]?.value);
				}
			}
			// maps the array of assets and the array of quotes, multiplying the respective index
			// sum all values and set the final Dollar balance state to show in the company header
			const multiplyAssetsToDollar = () => {
				const DollarValues = contractCompanyAssetsData.map(asset =>
					companyAssetsDollarQuotation.map(
						assetQuotation => Number(asset.formatted) * assetQuotation
					)
				);
				const sumAllDollarValues = DollarValues[0]?.reduce(
					(partialSum, acc) => partialSum + acc,
					0
				);
				setTotalCompanyBalanceInDollar(sumAllDollarValues);
			};
			multiplyAssetsToDollar();
		}
	}, [contractCompanyAssetsData]);

	const contextStates = useMemo(
		() => ({
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
			displayNeedFundsCard,
			setDisplayNeedFundsCard,
			companiesWithMissingFunds,
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
			updateCompany,
			isLoadingCompanies,
			getCompanieActivities,
			getAllCompanyTeams,
			getAllCompaniesUserActivities,
			getCompaniesOverview,
			totalCompanyBalanceInDollar,
			selectedCompany,
			setAllUserBalance,
			allUserBalance,
		}),
		[
			setEditedInfo,
			editedInfo,
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
			displayNeedFundsCard,
			setDisplayNeedFundsCard,
			companiesWithMissingFunds,
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
			updateCompany,
			isLoadingCompanies,
			getCompanieActivities,
			getAllCompanyTeams,
			getAllCompaniesUserActivities,
			getCompaniesOverview,
			totalCompanyBalanceInDollar,
			selectedCompany,
			setAllUserBalance,
			allUserBalance,
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
