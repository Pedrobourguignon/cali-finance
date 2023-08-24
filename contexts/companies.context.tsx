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
} from 'types';
import { checkJwt, mainClient, navigationPaths } from 'utils';
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useQuery,
} from 'react-query';
import { useAccount } from 'wagmi';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';
import router, { useRouter } from 'next/router';
import { MAIN_SERVICE_ROUTES } from 'helpers';
import { readContract } from '@wagmi/core';
import companyAbi from 'utils/abi/company.json';
import { GetCompanyUsersRes } from 'types/interfaces/main-server/IUser';
import { useAuth } from 'hooks';
import { formatContractNumbers } from 'utils/formatContractNumbers';

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
	getCompanyById: (id: number) => Promise<GetUserCompaniesRes>;
	updateCompany: (company: ICompany) => Promise<void>;
	getAllCompanyEmployees: (id: number) => Promise<GetCompanyUsersRes[]>;
	addEmployeeToTeam: (employee: INewEmployee) => Promise<void>;
	allUserCompanies: GetUserCompaniesRes[] | undefined;
	selectedCompany: GetUserCompaniesRes;
	setCompaniesWithMissingFunds: Dispatch<SetStateAction<GetUserCompaniesRes[]>>;
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
	setEmployeesBalance: Dispatch<SetStateAction<number>>;
	employeesBalance: number;
	setEmployeesRevenue: Dispatch<SetStateAction<number>>;
	employeesRevenue: number;
	isLoadingCompanies: boolean;
	refetchAllUserCompanies: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetUserCompaniesRes[], unknown>>;
	setIsLoadingTotalFunds: Dispatch<SetStateAction<boolean>>;
	isLoadingTotalFunds: boolean;
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isConnected } = useAccount();
	const { address: wallet } = useAccount();
	const { session } = useAuth();
	const { locale, query } = useRouter();
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
	const [employeesBalance, setEmployeesBalance] = useState<number>(0);
	const [employeesRevenue, setEmployeesRevenue] = useState<number>(0);
	const [isLoadingTotalFunds, setIsLoadingTotalFunds] = useState(false);

	const getAllUserCompanies: () => Promise<
		GetUserCompaniesRes[]
	> = async () => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.allUserCompanies(wallet)
		);
		return response.data;
	};

	const {
		data: allUserCompanies,
		isLoading: isLoadingCompanies,
		refetch: refetchAllUserCompanies,
	} = useQuery(['all-companies'], getAllUserCompanies, {
		enabled: !!isConnected && !!session,
	});

	const getCompaniesOverview = async () => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(MAIN_SERVICE_ROUTES.getOverview);
		return response.data;
	};

	useEffect(() => {
		if (companiesWithMissingFunds.length) {
			setDisplayMissingFundsWarning('flex');
		} else {
			setDisplayMissingFundsWarning('none');
		}
	}, [companiesWithMissingFunds]);

	const getCompanyById = async (id: number) => {
		checkJwt();
		const response = await mainClient.get(`/company/${id}`);
		if (response.data.totalFundsUsd !== selectedCompany.totalFundsUsd) {
			setIsLoadingTotalFunds(false);
		}
		setSelectedCompany(response.data);
		return response.data;
	};

	useEffect(() => {
		if (session) {
			getAllUserCompanies();
			if (query.id) getCompanyById(+query.id);
		}
	}, [session]);

	useEffect(() => {
		if (
			selectedCompany.totalFundsUsd !== undefined &&
			selectedCompany.totalFundsUsd < employeesBalance
		) {
			setDisplayNeedFundsCard('flex');
		} else setDisplayNeedFundsCard('none');
	}, [employeesBalance, selectedCompany]);

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

	const handleMissingFunds = () => {
		let employeesWallet: string[] = [];
		if (allUserCompanies)
			allUserCompanies.forEach(async company => {
				if (company.id && company.isAdmin) {
					const employees = await getAllCompanyEmployees(company.id);
					if (employees.length !== 0) {
						employees.map((employee: IEmployee) => {
							if (employee.wallet) {
								return employeesWallet.push(employee.wallet);
							}
							return null;
						});
						if (company.contract && session) {
							try {
								const data = await readContract({
									address: company.contract,
									abi: companyAbi,
									functionName: 'getBulkBalance',
									args: [employeesWallet],
								});
								const result = await Promise.all([...(data as bigint[])]);
								if (locale) {
									const numberResult = result.map(item =>
										Number(formatContractNumbers(item, locale, 18, false))
									);
									const sum = numberResult.reduce(
										(accumulator, currentValue) => accumulator + currentValue,
										0
									);

									if (!company.totalFundsUsd || company.totalFundsUsd < sum)
										setCompaniesWithMissingFunds(prevState =>
											prevState.concat(company)
										);
								}
							} catch (err) {
								console.log(err);
							}
						}
					}
					employeesWallet = [];
				}
			});
	};
	useEffect(() => {
		handleMissingFunds();
	}, [allUserCompanies]);

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

	const contextStates = useMemo(
		() => ({
			setEditedInfo,
			editedInfo,
			refetchAllUserCompanies,
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
			getCompanieActivities,
			getAllCompanyTeams,
			getAllCompaniesUserActivities,
			getCompaniesOverview,
			selectedCompany,
			employeesBalance,
			setEmployeesBalance,
			setCompaniesWithMissingFunds,
			employeesRevenue,
			setEmployeesRevenue,
			isLoadingCompanies,
			setIsLoadingTotalFunds,
			isLoadingTotalFunds,
		}),
		[
			editedInfo,
			refetchAllUserCompanies,
			displayMissingFundsWarning,
			displayNeedFundsCard,
			companiesWithMissingFunds,
			getAllUserCompanies,
			socialMediasData,
			addEmployeeToTeam,
			addEmployeeCsv,
			allUserCompanies,
			updateCompany,
			getCompaniesOverview,
			selectedCompany,
			employeesBalance,
			employeesRevenue,
			isLoadingCompanies,
			setIsLoadingTotalFunds,
			isLoadingTotalFunds,
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
