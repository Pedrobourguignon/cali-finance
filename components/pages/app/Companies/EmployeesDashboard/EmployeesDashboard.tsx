import { Flex, Text, useDisclosure, Button } from '@chakra-ui/react';
import { readContract } from '@wagmi/core';
import {
	AddEmployee,
	BlackButton,
	EmployeeData,
	NoEmployeeSkeleton,
	AddEmployeeMobile,
} from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
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
		selectedCompany,
		getCompanyById,
		setEmployeesBalance,
		setEmployeesRevenue,
	} = useCompanies();
	const { query } = useRouter();
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
			if (!employeesWallet.includes(employee.wallet!)) {
				employeesWallet.push(employee.wallet!);
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
				const result = await Promise.all([...(data as number[])]);
				const numberResult = result.map(item => Number(item));
				const sum = numberResult.reduce(
					(accumulator, currentValue) => accumulator + currentValue,
					0
				);
				setEmployeesBalance(sum);
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
				selectedCompany={selectedCompany}
			/>

			<AddEmployeeMobile
				isOpen={isOpenMobile}
				onClose={onCloseMobile}
				selectedCompany={selectedCompany}
			/>
			<Flex justify="space-between" w="100%" align="center">
				{employees?.length === 0 ? (
					<Text color={theme.text.primary} fontWeight="medium">
						{translate('youDontHaveEmployee')}
					</Text>
				) : (
					<Flex fontWeight="medium" gap="1">
						<Text>{employees?.length}</Text>
						<Text>{translate('employees')}</Text>
					</Flex>
				)}
				<Flex gap="8" align="center" display={{ base: 'none', sm: 'flex' }}>
					{employees && (
						<Button h="max-content" onClick={() => toggleListView()}>
							<Text fontSize="xs" color="gray.500" fontWeight="medium">
								{isFullList ? translate('seeLess') : translate('seeAll')}
							</Text>
						</Button>
					)}
					<BlackButton
						px="3"
						onClick={onOpen}
						fontSize="xs"
						gap="2.5"
						fontWeight="medium"
						py="1"
						borderRadius="base"
					>
						<Text>+</Text>
						<Text>{translate('addEmployee')}</Text>
					</BlackButton>
				</Flex>
				<Flex gap="8" align="center" display={{ base: 'flex', sm: 'none' }}>
					{employees && (
						<Button h="max-content" onClick={() => toggleListView()}>
							<Text fontSize="xs" color="gray.500" fontWeight="medium">
								{isFullList ? translate('seeLess') : translate('seeAll')}
							</Text>
						</Button>
					)}
					<BlackButton
						px="3"
						onClick={onOpenMobile}
						fontSize="xs"
						gap="2.5"
						fontWeight="medium"
						py="1"
						borderRadius="base"
					>
						<Text>+</Text>
						<Text>{translate('addEmployee')}</Text>
					</BlackButton>
				</Flex>
			</Flex>
			{isLoadingEmployees ? (
				<Flex w="100%" direction="column" gap="2">
					<Flex justify="space-between" fontSize="sm">
						<Text>{translate('nameAddress')}</Text>
						{isGeneral && <Text>{translate('team')}</Text>}
						<Text w="24">{translate('amount')}</Text>
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
					<Flex justify="space-between" fontSize="sm">
						<Text>{translate('nameAddress')}</Text>
						{isGeneral && <Text>{translate('team')}</Text>}
						<Text w="24">{translate('amount')}</Text>
					</Flex>
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
