import { Button, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import { AddEmployee, EmployeeData } from 'components';
import { IEmployee } from 'types';
import useTranslation from 'next-translate/useTranslation';

interface IEmployeeDashboard {
	employees: IEmployee[];
	isGeneral: boolean;
}

export const EmployeesDashboard: React.FC<IEmployeeDashboard> = ({
	employees,
	isGeneral,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { setSelectedCompanyEmployees, selectedCompany } = useCompanies();

	return (
		<Flex w="100%" direction="column" gap="4" color={theme.text.primary}>
			<AddEmployee
				isOpen={isOpen}
				onClose={onClose}
				company={selectedCompany.name}
				setEmployees={setSelectedCompanyEmployees}
			/>
			<Flex justify="space-between" w="100%" align="center">
				<Flex fontWeight="medium" gap="1">
					<Text>{employees?.length}</Text>
					<Text>{translate('employees')}</Text>
				</Flex>
				<Flex gap="8" align="center">
					{isGeneral && (
						<Link href="/">
							<Text fontSize="xs" color="gray.500" fontWeight="medium">
								{translate('seeAll')}
							</Text>
						</Link>
					)}
					<Button
						bg={theme.bg.primary}
						fontSize="xs"
						fontWeight="medium"
						gap="2.5"
						color="white"
						h="6"
						px="3"
						borderRadius="base"
						_hover={{ opacity: '80%' }}
						_active={{}}
						_focus={{}}
						onClick={onOpen}
					>
						<Text>+</Text>
						<Text>{translate('addEmployee')}</Text>
					</Button>
				</Flex>
			</Flex>
			<Flex w="100%" direction="column" gap="2">
				<Flex justify="space-between" fontSize="sm">
					<Text>{translate('nameAddress')}</Text>
					{isGeneral && <Text>{translate('team')}</Text>}
					<Text w="24">{translate('amount')}</Text>
				</Flex>
				<Flex direction="column" gap="2">
					{employees?.slice(0, 3).map((employee, index) => (
						<EmployeeData
							key={+index}
							employee={employee}
							isGeneral={isGeneral}
						/>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};
