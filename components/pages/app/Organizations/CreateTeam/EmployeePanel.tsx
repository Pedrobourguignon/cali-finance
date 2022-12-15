import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { EmployeeData, NoEmployeeSkeleton, AddEmployee } from 'components';
import { IEmployee } from 'types';
import { useState } from 'react';

interface IEmployeePanel {
	teamName: string;
}

export const EmployeePanel: React.FC<IEmployeePanel> = ({ teamName }) => {
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [employees, setEmployees] = useState<IEmployee[]>([]);

	return (
		<Flex w="full" direction="column" gap="4" py="4">
			<AddEmployee
				isOpen={isOpen}
				onClose={onClose}
				company={teamName}
				setEmployees={setEmployees}
			/>
			;
			<Flex justify="space-between" w="full" align="center">
				<Flex fontWeight="medium" gap="1">
					<Text color={theme.text.primary}>{employees.length}</Text>
					<Text color={theme.text.primary}>Employees</Text>
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
						<Text>Add Employee</Text>
					</Button>
				</Flex>
			</Flex>
			<Flex w="100%" direction="column" gap="2">
				<Flex justify="space-between">
					<Text color={theme.text.primary}>Name/Adress</Text>
					<Text w="24" color={theme.text.primary}>
						Amount
					</Text>
				</Flex>
				<NoEmployeeSkeleton display={employees.length > 0 ? 'none' : 'flex'} />
				<Flex direction="column" gap="2">
					{employees.slice(0, 3).map((employee, index) => (
						<EmployeeData key={+index} employee={employee} display="none" />
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};
