import { Flex, Text, useDisclosure, Button } from '@chakra-ui/react';
import {
	AddEmployee,
	BlackButton,
	EmployeeData,
	NoEmployeeSkeleton,
} from 'components';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { ICompany } from 'types/interfaces/main-server/ICompany';

interface IEmployeeDashboard {
	isGeneral: boolean;
	selectedCompany: ICompany | undefined;
}

export const EmployeesDashboard: React.FC<IEmployeeDashboard> = ({
	isGeneral,
	selectedCompany,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const { getAllCompanyEmployees } = useCompanies();
	const { query } = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();

	const {
		data: employees,
		isLoading: isLoadingEmployees,
		error,
	} = useQuery('all-company-employees', () =>
		getAllCompanyEmployees(Number(query.id))
	);

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
			<Flex justify="space-between" w="100%" align="center">
				<Flex fontWeight="medium" gap="1">
					<Text>{employees?.length}</Text>
					<Text>{translate('employees')}</Text>
				</Flex>
				<Flex gap="8" align="center">
					<Button h="max-content" onClick={() => toggleListView()}>
						<Text fontSize="xs" color="gray.500" fontWeight="medium">
							{isFullList ? translate('seeLess') : translate('seeAll')}
						</Text>
					</Button>

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
			</Flex>
			<Flex w="100%" direction="column" gap="2">
				<Flex justify="space-between" fontSize="sm">
					<Text>{translate('nameAddress')}</Text>
					{isGeneral && <Text>{translate('team')}</Text>}
					<Text w="24">{translate('amount')}</Text>
				</Flex>
				<Flex direction="column" gap="2">
					{isLoadingEmployees ? (
						<>
							<NoEmployeeSkeleton />
							<NoEmployeeSkeleton />
							<NoEmployeeSkeleton />
						</>
					) : (
						employees
							?.slice(0, isFullList ? employees.length : 3)
							.map((employee, index) => (
								<EmployeeData
									key={+index}
									employee={employee}
									isGeneral={isGeneral}
								/>
							))
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};
