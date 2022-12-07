import { Button, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { EmployeeData } from 'components';
import { IEmployee } from 'types';

const employees: IEmployee[] = [
	{
		name: 'Kim Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
		photo: '/images/avatar.png',
		amount: 10.0,
		coin: 'USDT',
		team: 'General',
	},
	{
		name: 'Kylie Jenner',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
		photo: '/images/avatar.png',
		amount: 100.0,
		coin: 'USDT',
		team: 'Marketing',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		photo: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		photo: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		photo: '/images/avatar.png',
		amount: 80.0,
		coin: 'USDT',
		team: 'Finance',
	},
];

export const EmployeesDashboard = () => {
	const theme = usePicasso();
	return (
		<Flex w="100%" direction="column" gap="4">
			<Flex justify="space-between" w="100%" align="center">
				<Flex fontWeight="medium" gap="1">
					<Text>{employees.length}</Text>
					<Text>Employees</Text>
				</Flex>
				<Flex gap="8" align="center">
					<LinkBox>
						<NextLink href="/">
							<LinkOverlay
								cursor="pointer"
								fontSize="xs"
								color="gray.500"
								fontWeight="medium"
							>
								See all
							</LinkOverlay>
						</NextLink>
					</LinkBox>
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
					>
						<Text>+</Text>
						<Text>Add Employee</Text>
					</Button>
				</Flex>
			</Flex>
			<Flex w="100%" direction="column" gap="2">
				<Flex justify="space-between">
					<Text>Name/Adress</Text>
					<Text>Team</Text>
					<Text w="24">Amount</Text>
				</Flex>
				<Flex direction="column" gap="2">
					{employees.slice(0, 3).map((employee, index) => (
						<EmployeeData key={+index} employee={employee} />
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};
