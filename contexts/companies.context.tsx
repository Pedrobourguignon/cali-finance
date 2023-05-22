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
	IEmployee,
	ISocialMedia,
	INewEmployee,
	IEditedEmployeeInfo,
	INotificationList,
	IHistoryNotifications,
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

interface ICompanyContext {
	setSelectedCompany: Dispatch<SetStateAction<ICompany>>;
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
	addEmployeeCsv: (
		employee: string | undefined | null | ArrayBuffer
	) => Promise<void>;
	updateEmployee: (
		editedEmployeeInfo: IEditedEmployeeInfo,
		teamId: number
	) => Promise<void>;
	allUserCompanies: GetUserCompaniesRes[];
	selectedCompany: ICompany;
	companiesWithMissingFunds: GetUserCompaniesRes[];
	getCompanieActivities: (
		companyId: number
	) => Promise<IHistoryNotifications[]>;
	getAllCompanyTeams: (id: number) => Promise<any>;
	getAllCompaniesUserActivities: () => Promise<IHistoryNotifications[]>;
}

export const CompaniesContext = createContext({} as ICompanyContext);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { query } = useRouter();
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

	const [companiesWithMissingFunds, setCompaniesWithMissingFunds] = useState<
		GetUserCompaniesRes[]
	>([]);

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
		}),
		[
			selectedCompany,
			editedInfo,
			displayMissingFundsWarning,
			displayNeedFundsCard,
			companiesWithMissingFunds,
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
