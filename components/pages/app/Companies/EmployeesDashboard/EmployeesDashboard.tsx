import { Flex, Text, useDisclosure, Button } from '@chakra-ui/react';
import { readContract } from '@wagmi/core';
import {
	AddEmployee,
	BlackButton,
	EmployeeData,
	NoEmployeeSkeleton,
	AddEmployeeMobile,
} from 'components';
import { useAuth, useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { formatContractNumbers } from 'utils';
import companyAbi from 'utils/abi/company.json';

interface IEmployeeDashboard {
	isGeneral: boolean;
}

export const EmployeesDashboard: React.FC<IEmployeeDashboard> = ({
	isGeneral,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const {
		getAllCompanyEmployees,
		getCompanyById,
		setEmployeesBalance,
		setEmployeesRevenue,
	} = useCompanies();
	const { query, locale } = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenMobile,
		onOpen: onOpenMobile,
		onClose: onCloseMobile,
	} = useDisclosure();
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();

	const {
		data: employees,
		isLoading: isLoadingEmployees,
		error,
	} = useQuery('all-company-employees', () =>
		getAllCompanyEmployees(Number(query.id))
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
		'created-company-overview',
		() => getCompanyById(Number(query.id))
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
					const numberResult = result.map(item =>
						Number(
							formatContractNumbers(
								item,
								locale,
								selectedCompanyData.tokenDecimals || 18,
								false
							)
						)
					);
					const sum = numberResult.reduce(
						(accumulator, currentValue) => accumulator + currentValue,
						0
					);
					setEmployeesBalance(sum);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		getEmployeesBalance();
		calculateEmployeeRevenue();
	}, [employees, selectedCompanyData]);

	useEffect(() => {
		if (error) {
			router.push('/404');
		}
	}, [error]);

	return (
		<Flex w="100%" direction="column" gap="4" color={theme.text.primary}>
			<AddEmployee
				isOpen={isOpen}
				onClose={onClose}
				selectedCompany={selectedCompanyData}
			/>

			<AddEmployeeMobile
				isOpen={isOpenMobile}
				onClose={onCloseMobile}
				selectedCompany={selectedCompanyData}
			/>
			<Flex justify="space-between" w="100%" align="center">
				{employees?.length === 0 ? (
					<Text color={theme.text.primary} fontWeight="medium">
						{translate('youDontHaveEmployee')}
					</Text>
				) : (
					<Flex fontWeight="medium" gap="1">
						<Text>{employees?.length}</Text>
						<Text>
							{employees?.length === 1
								? translate('employee')
								: translate('employees')}
						</Text>
					</Flex>
				)}
				<Flex gap="6" align="center" display={{ base: 'none', md: 'flex' }}>
					{employees && employees?.length > 3 && (
						<Button h="max-content" onClick={() => toggleListView()}>
							<Text fontSize="xs" color="gray.500" fontWeight="medium">
								{isFullList ? translate('seeLess') : translate('seeAll')}
							</Text>
						</Button>
					)}
					<BlackButton
						px="4"
						onClick={onOpen}
						fontSize="xs"
						gap="2.5"
						fontWeight="medium"
						py="1.5"
						borderRadius="base"
						isDisabled={selectedCompanyData?.contract === null}
						title={
							selectedCompanyData?.contract === null
								? translate('needToAwaitThePolling')
								: 'Add employee'
						}
					>
						<Text>+</Text>
						<Text>{translate('addEmployee')}</Text>
					</BlackButton>
				</Flex>
				<Flex gap="4" align="center" display={{ base: 'flex', md: 'none' }}>
					{employees && employees?.length > 3 && (
						<Button h="max-content" onClick={() => toggleListView()}>
							<Text fontSize="xs" color="gray.500" fontWeight="medium">
								{isFullList ? translate('seeLess') : translate('seeAll')}
							</Text>
						</Button>
					)}
					<BlackButton
						px="4"
						onClick={onOpenMobile}
						fontSize="xs"
						gap="2.5"
						fontWeight="medium"
						py="1.5"
						borderRadius="base"
					>
						<Text>+</Text>
						<Text>{translate('addEmployeeMobile')}</Text>
					</BlackButton>
				</Flex>
			</Flex>
			{isLoadingEmployees ? (
				<Flex w="100%" direction="column" gap="2">
					<Flex justify="space-between" fontSize="sm">
						<Text>{translate('nameAddress')}</Text>
						{isGeneral && <Text>{translate('team')}</Text>}
						<Text>{translate('amount')}</Text>
					</Flex>
					<Flex direction="column" gap="2">
						<>
							<NoEmployeeSkeleton />
							<NoEmployeeSkeleton />
							<NoEmployeeSkeleton />
						</>
					</Flex>
				</Flex>
			) : (
				<Flex w="100%" direction="column" gap="2">
					{employees && employees.length > 0 && (
						<Flex justify="space-between" fontSize="sm">
							<Text>{translate('nameAddress')}</Text>
							{isGeneral && <Text>{translate('team')}</Text>}
							<Text>{translate('amount')}</Text>
						</Flex>
					)}
					<Flex direction="column" gap="2">
						{employees
							?.slice(0, isFullList ? employees.length : 3)
							.map((employee, index) => (
								<EmployeeData
									key={+index}
									employee={employee}
									isGeneral={isGeneral}
								/>
							))}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};
