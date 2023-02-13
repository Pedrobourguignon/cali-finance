import { Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { AddEmployee, BlackButton, EmployeeData } from 'components';
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

	return (
		<Flex w="100%" direction="column" gap="4" color={theme.text.primary}>
			<AddEmployee isOpen={isOpen} onClose={onClose} />
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
