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
	IAssetsOptions,
} from 'types';
import { mainClient, navigationPaths } from 'utils';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';
import router, { useRouter } from 'next/router';
import { MAIN_SERVICE_ROUTES } from 'helpers';
import { readContract } from '@wagmi/core';
import companyAbi from 'utils/abi/company.json';

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
	getAllCompanyEmployees: (id: number) => Promise<IEmployee[]>;
	addEmployeeToTeam: (employee: INewEmployee) => Promise<void>;
	allUserCompanies: GetUserCompaniesRes[] | undefined;
	selectedCompany: GetUserCompaniesRes;
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
	getUsdtBalance: number;
	setEmployeesBalance: Dispatch<SetStateAction<number>>;
	employeesBalance: number;
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { query } = useRouter();
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
	const [allUserBalance, setAllUserBalance] = useState<number[]>([]);
	const [assetOptions, setAssetOptions] = useState<IAssetsOptions[]>([]);
	const [employeesBalance, setEmployeesBalance] = useState<number>(0);

	const sumAvailableToWithdraw = () => {
		const total = allUserBalance.reduce((acc, balance) => acc + balance, 0);
		const newAssetOptions = [
			{
				name: 'USDT',
				value: total,
			},
		];
		setAssetOptions(newAssetOptions);
	};

	useEffect(() => {
		sumAvailableToWithdraw();
	}, [allUserBalance.length]);

	const getUsdtBalance = useMemo(() => assetOptions[0]?.value, [assetOptions]);

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

	const getEmployeeBalance = async () => {
		if (allUserCompanies) {
			const filteredCompanies = allUserCompanies.filter(
				company => Boolean(company.isAdmin) === false
			);
			const contractAddress = filteredCompanies.map(
				filteredCompany => filteredCompany.contract
			);

			const data = contractAddress.map(item =>
				readContract({
					address: item,
					abi: companyAbi,
					functionName: 'getSingleBalance',
					args: [wallet],
				})
			);
			try {
				const result = await Promise.all(data);
				const numberResult = result.map(item => Number(item));
				const availableToWithdraw = numberResult.filter(number => number !== 0);
				setAllUserBalance(availableToWithdraw);
			} catch (err) {
				console.log(err);
			}
		}
	};

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
		const response = await mainClient.get(`/company/${id}`);
		setSelectedCompany(response.data);
		return response.data;
	};

	useEffect(() => {
		if (selectedCompany.totalFundsUsd! < employeesBalance) {
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
				router.push(navigationPaths.dashboard.companies.overview(query.id!))
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
						employees.map((employee: IEmployee) =>
							employeesWallet.push(employee.wallet!)
						);
						if (company.contract) {
							try {
								const data = await readContract({
									address: company.contract,
									abi: companyAbi,
									functionName: 'getBulkBalance',
									args: [employeesWallet],
								});
								const result = await Promise.all([...(data as number[])]);
								const numberResult = result.map(item => Number(item));
								const sum = numberResult.reduce(
									(accumulator, currentValue) => accumulator + currentValue,
									0
								);
								if (company.totalFundsUsd! < sum)
									setCompaniesWithMissingFunds(prevState =>
										prevState.concat(company)
									);
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
		getEmployeeBalance();
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
			displayMissingFundsWarning,
			setDisplayMissingFundsWarning,
			displayNeedFundsCard,
			setDisplayNeedFundsCard,
			companiesWithMissingFunds,
			getAllUserCompanies,
			createCompany,
			getUsdtBalance,
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
			selectedCompany,
			setAllUserBalance,
			allUserBalance,
			employeesBalance,
			setEmployeesBalance,
		}),
		[
			editedInfo,
			displayMissingFundsWarning,
			displayNeedFundsCard,
			companiesWithMissingFunds,
			getAllUserCompanies,
			getUsdtBalance,
			socialMediasData,
			addEmployeeToTeam,
			addEmployeeCsv,
			allUserCompanies,
			updateCompany,
			isLoadingCompanies,
			getCompaniesOverview,
			selectedCompany,
			allUserBalance,
			employeesBalance,
		]
	);

	return (
		<CompaniesContext.Provider value={contextStates}>
			{children}
		</CompaniesContext.Provider>
	);
};
