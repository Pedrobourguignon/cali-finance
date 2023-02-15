import { Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import { Button, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import { AddEmployee, BlackButton, EmployeeData } from 'components';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

interface IEmployeeDashboard {
	isGeneral: boolean;
}

export const EmployeesDashboard: React.FC<IEmployeeDashboard> = ({
	isGeneral,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	const { selectedCompany } = useCompanies();
	const { employees } = selectedCompany;

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isFullList, onToggle: toggleListView } = useDisclosure();

	return (
		<Flex w="100%" direction="column" gap="4" color={theme.text.primary}>
			<AddEmployee isOpen={isOpen} onClose={onClose} />
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
		</Flex>
	);
};
