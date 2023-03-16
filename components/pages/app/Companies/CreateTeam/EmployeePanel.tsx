import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { EmployeeData, NoEmployeeSkeleton, AddEmployee } from 'components';
import { IEmployee } from 'types';
import useTranslation from 'next-translate/useTranslation';
import { Dispatch, SetStateAction } from 'react';

interface IEmployeePanel {
	companyName?: string;
	employees: IEmployee[];
	setEmployees: Dispatch<SetStateAction<IEmployee[]>>;
}

export const EmployeePanel: React.FC<IEmployeePanel> = ({
	companyName,
	employees,
	setEmployees,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-team');
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex w="full" direction="column" gap="4" py="4">
			<AddEmployee
				isOpen={isOpen}
				onClose={onClose}
				setEmployees={setEmployees}
			/>
			<Flex justify="space-between" w="full" align="center">
				<Flex fontWeight="medium" gap="1">
					<Text color={theme.text.primary}>{employees.length}</Text>
					<Text color={theme.text.primary}>{translate('employees')}</Text>
				</Flex>
				<Flex gap="8" align="center">
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
				<Flex justify="space-between">
					<Text color={theme.text.primary}>{translate('nameAddress')}</Text>
					<Text w="24" color={theme.text.primary}>
						{translate('amount')}
					</Text>
				</Flex>
				<NoEmployeeSkeleton />
				<Flex direction="column" gap="2">
					{employees.slice(0, 3).map((employee, index) => (
						<EmployeeData key={+index} employee={employee} display="none" />
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};
