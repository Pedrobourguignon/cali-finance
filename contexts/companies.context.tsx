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
import { useToast } from '@chakra-ui/react';
import { AlertToast } from 'components';

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
	calculateEmployeeRevenue: () => void;
	getEmployeesBalance: () => Promise<void>;
	selectedCompanyData: GetUserCompaniesRes | undefined;
	employees: GetCompanyUsersRes[] | undefined;
	sendCompanyTx: (id: number, txId: string) => Promise<void>;
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isConnected, address: wallet } = useAccount();
	const { session } = useAuth();
	const toast = useToast();
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
		try {
			if (!wallet) throw new Error('User not connected');
			const response = await mainClient.get(
				MAIN_SERVICE_ROUTES.allUserCompanies(wallet)
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const {
		data: allUserCompanies,
		isLoading: isLoadingCompanies,
		refetch: refetchAllUserCompanies,
	} = useQuery(['all-companies'], getAllUserCompanies, {
		enabled: !!isConnected && !!session && !!wallet,
	});

	const getCompaniesOverview = async () => {
		try {
			if (!wallet) throw new Error('User not connected');
			const response = await mainClient.get(MAIN_SERVICE_ROUTES.getOverview);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
	useEffect(() => {
		if (companiesWithMissingFunds.length) {
			setDisplayMissingFundsWarning('flex');
		} else {
			setDisplayMissingFundsWarning('none');
		}
	}, [companiesWithMissingFunds]);

	const getCompanyById = async (id: number): Promise<GetUserCompaniesRes> => {
		try {
			checkJwt();
			const response = await mainClient.get(`/company/${id}`);
			if (response.data.totalFundsUsd !== selectedCompany.totalFundsUsd) {
				setIsLoadingTotalFunds(false);
			}
			setSelectedCompany(response.data);
			return response.data;
		} catch (error) {
			toast({
				position: 'top-right',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="weAreWorkingToSolve"
						type="error"
					/>
				),
			});
			throw error;
		}
	};

	const sendCompanyTx = async (id: number, txId: string) => {
		try {
			await mainClient.patch(MAIN_SERVICE_ROUTES.sendCompanyTx(id), {
				txId,
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	useEffect(() => {
		if (session && wallet) {
			getAllUserCompanies();
			if (query.id) getCompanyById(+query.id);
		}
	}, [session]);

	const createCompany = async (company: ICompany) => {
		try {
			const id = await mainClient.post(MAIN_SERVICE_ROUTES.createCompany, {
				company,
			});

			router.push(
				navigationPaths.dashboard.companies.overview(id.data.id.toString())
			);
		} catch (error) {
			console.error(error);
		}
	};

	const updateCompany = async (company: ICompany) => {
		try {
			const id = await mainClient.put(
				MAIN_SERVICE_ROUTES.updateCompany(Number(query.id)),
				{
					company,
				}
			);

			router.push(navigationPaths.dashboard.companies.overview(query.id));
		} catch (error) {
			console.error(error);
		}
	};

	const getAllCompanyEmployees = async (
		id: number
	): Promise<GetCompanyUsersRes[]> => {
		try {
			const response = await mainClient.get(
				MAIN_SERVICE_ROUTES.allCompanyEmployees(id)
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const { data: employees } = useQuery(
		['all-company-employees'],
		() => getAllCompanyEmployees(Number(query.id)),
		{
			enabled: !!query.id,
		}
	);

	const calculateEmployeeRevenue = () => {
		if (employees) {
			const sum = employees.reduce(
				(prevVal, currentVal) =>
					currentVal.revenue ? prevVal + currentVal.revenue : 0,
				0
			);
			setEmployeesRevenue(sum);
		}
	};

	const { data: selectedCompanyData } = useQuery(
		['created-company-overview'],
		() => getCompanyById(Number(query.id)),
		{
			enabled: !!query.id,
		}
	);

	const getEmployeesBalance = async () => {
		const employeesWallet: string[] = [];
		employees?.forEach(employee => {
			if (employee.wallet && !employeesWallet.includes(employee.wallet)) {
				employeesWallet.push(employee.wallet);
			}
		});
		if (selectedCompanyData?.contract) {
			try {
				const data = await readContract({
					address: selectedCompanyData.contract,
					abi: companyAbi,
					functionName: 'getBulkBalance',
					args: [employeesWallet],
				});
				const result = await Promise.all([...(data as bigint[])]);
				if (locale && selectedCompanyData.tokenDecimals) {
					const sum = result.reduce(
						(accumulator: bigint, currentValue: bigint) =>
							accumulator + currentValue,
						0n
					);

					setEmployeesBalance(Number(sum));
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleMissingFunds = () => {
		let employeesWallet: string[] = [];
		if (allUserCompanies)
			allUserCompanies.forEach(async company => {
				if (company.id && company.isAdmin) {
					const companyEmployees = await getAllCompanyEmployees(company.id);
					if (companyEmployees.length !== 0) {
						companyEmployees.map((employee: GetCompanyUsersRes) => {
							if (employee.wallet) {
								return employeesWallet.push(employee.wallet);
							}
							return null;
						});
						if (company.contract) {
							try {
								const data = await readContract({
									address: company.contract,
									abi: companyAbi,
									functionName: 'getBulkBalance',
									args: [employeesWallet],
								});
								const result = await Promise.all([...(data as bigint[])]);
								if (locale) {
									const sum = Number(
										result.reduce(
											(accumulator: bigint, currentValue: bigint) =>
												accumulator + currentValue,
											0n
										)
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
		if (
			selectedCompanyData &&
			selectedCompanyData.totalFundsUsd !== undefined &&
			selectedCompanyData.totalFundsUsd < employeesBalance
		) {
			setCompaniesWithMissingFunds(
				companiesWithMissingFunds.concat(selectedCompanyData)
			);
			setDisplayNeedFundsCard('flex');
		} else setDisplayNeedFundsCard('none');
	}, [employeesBalance, selectedCompanyData]);

	useEffect(() => {
		if (!allUserCompanies && session) refetchAllUserCompanies();
		handleMissingFunds();
	}, [allUserCompanies]);

	const getAllCompanyTeams = async (id: number) => {
		try {
			const response = await mainClient.get(
				MAIN_SERVICE_ROUTES.allCompanyTeams(id)
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const { data: teams } = useQuery(
		'all-company-teams',
		() => getAllCompanyTeams(Number(query.id)),
		{
			enabled: !!query.id,
		}
	);

	const addEmployeeToTeam = async (employee: INewEmployee) => {
		try {
			const { id } = teams[0];
			const groupId = 1;
			await mainClient.post(
				MAIN_SERVICE_ROUTES.addEmployee(id, groupId),
				employee
			);
		} catch (error) {
			console.error(error);
		}
	};

	const addEmployeeCsv = async (
		employee: string | undefined | null | ArrayBuffer
	) => {
		try {
			const { id } = teams[0];
			const groupId = 1;
			await mainClient.post(
				MAIN_SERVICE_ROUTES.addCsvEmployee(id, groupId),
				employee,
				{
					headers: { 'Content-Type': 'text/plain' },
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const updateEmployee = async (
		editedEmployeeInfo: IEditedEmployeeInfo,
		teamId: number
	) => {
		try {
			await mainClient.put(`/team/${teamId}/user`, editedEmployeeInfo);
		} catch (error) {
			console.error(error);
		}
	};

	const getCompanieActivities = async (companyId: number) => {
		try {
			const response = await mainClient.get(
				MAIN_SERVICE_ROUTES.companyRecentActivities(companyId),
				{
					params: {
						pageLimit: 9,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const getAllCompaniesUserActivities = async () => {
		try {
			const response = await mainClient.get(
				MAIN_SERVICE_ROUTES.allCompaniesUserActivities(),
				{
					params: {
						pageLimit: 300,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
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
			calculateEmployeeRevenue,
			getEmployeesBalance,
			selectedCompanyData,
			employees,
			sendCompanyTx,
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
			selectedCompanyData,
			employees,
			sendCompanyTx,
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
