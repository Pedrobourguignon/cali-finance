import { Button, Flex, Icon, Img, Select, Text } from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { truncateWallet } from 'utils/truncateWallet';

interface IEmployee {
	name: string;
	wallet: string;
	photo: string;
	amount: string;
	coin: string;
	team: string;
}

const teams = ['General', 'Marketing', 'Finance', 'Trozorba'];
export const EmployeeData: React.FC<IEmployee> = ({
	name,
	wallet,
	photo,
	amount,
	coin,
	team,
}) => (
	<Flex
		w="100%"
		justify="space-between"
		align="center"
		bg="white"
		color="black"
		px="3"
		py="2"
		borderRadius="base"
	>
		<Flex justify="center" align="center" gap="3" maxW="36">
			<Img src={photo} boxSize="6" />
			<Flex direction="column" justifyItems="center">
				<Text fontSize="sm">{name}</Text>
				<Flex align="center">
					<Text fontSize="xs" color="gray.500">
						{truncateWallet(wallet)}
					</Text>
					<Button
						w="3"
						h="3"
						bg="transparent"
						onClick={() => {
							navigator.clipboard.writeText(wallet);
						}}
					>
						<Icon as={MdContentCopy} boxSize="3" color="gray.500" />
					</Button>
				</Flex>
			</Flex>
		</Flex>
		<Flex>
			<Select
				size="sm"
				borderColor="gray.200"
				borderRadius="base"
				fontSize="sm"
			>
				{teams.map((item, index) => (
					<option selected={item === team} key={index} value={item}>
						{item}
					</option>
				))}
			</Select>
		</Flex>
		<Flex direction="column" align="end">
			<Flex gap="1" fontSize="xs">
				<Text>{amount}</Text>
				<Text>{coin}</Text>
			</Flex>
			<Button color="gray.500" fontSize="xs" fontWeight="medium" h="100%">
				Edit
			</Button>
		</Flex>
	</Flex>
);
