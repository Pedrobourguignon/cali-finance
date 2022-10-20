import { Button, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { EmployeeData } from './EmployeeData';

const employees = [
	{
		name: 'Kim Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36B4CFE',
		photo: '/images/avatar.png',
		amount: '10.000',
		coin: 'USDT',
		team: 'General',
	},
	{
		name: 'Kylie Jenner',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36Z9EXD',
		photo: '/images/avatar.png',
		amount: '100.000',
		coin: 'USDT',
		team: 'Marketing',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		photo: '/images/avatar.png',
		amount: '80.000',
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		photo: '/images/avatar.png',
		amount: '80.000',
		coin: 'USDT',
		team: 'Finance',
	},
	{
		name: 'Kloe Kardashian',
		wallet: '0x7E48CA2BD05EC61C2FA83CF34B066A8FF36C3QER',
		photo: '/images/avatar.png',
		amount: '80.000',
		coin: 'USDT',
		team: 'Finance',
	},
];

export const EmployeesDashboard = () => {
	const theme = usePicasso();
	return (
		<Flex w="100%" direction="column">
			<Flex justify="space-between" w="100%" align="center">
				<Text>Employees</Text>
				<Flex gap="8" align="center">
					<LinkBox>
						<NextLink href="/">
							<LinkOverlay
								fontSize="xs"
								color={theme.branding.blue}
								fontWeight="medium"
							>
								See All
							</LinkOverlay>
						</NextLink>
					</LinkBox>
					<Button
						bg="black"
						fontSize="xs"
						fontWeight="medium"
						gap="2.5"
						px="3"
						py="1"
					>
						<Text>+</Text>
						<Text>Add Employee</Text>
					</Button>
				</Flex>
			</Flex>
			<Flex justify="space-between">
				<Text>Name/Adress</Text>
				<Text>Team</Text>
				<Text>Amount</Text>
			</Flex>
			<Flex direction="column" gap="2">
				{employees.slice(0, 3).map((item, index) => (
					<EmployeeData
						key={index}
						name={item.name}
						wallet={item.wallet}
						team={item.team}
						photo={item.photo}
						amount={item.amount}
						coin={item.coin}
					/>
				))}
			</Flex>
		</Flex>
	);
};
