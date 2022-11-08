import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	InputGroup,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IoIosArrowDown } from 'react-icons/io';

interface ISelectorButton {
	onOpen: () => void;
}

export const WithdrawContent: React.FC<ISelectorButton> = ({ onOpen }) => {
	const theme = usePicasso();
	return (
		<Flex direction="column" gap="2">
			<Text color="black" fontSize="sm">
				Amount
			</Text>
			<InputGroup>
				<Input
					_placeholder={{ color: 'blackAlpha.500' }}
					placeholder="0.00"
					borderColor="black"
					flex="3"
					borderRightRadius="none"
					_hover={{}}
					color="blackAlpha.500"
				/>
				<Button
					borderLeftRadius="none"
					bg={theme.bg.primary}
					_hover={{ opacity: '80%' }}
					onClick={onOpen}
					_active={{}}
					_focus={{}}
				>
					<Flex gap="2" align="center">
						<Img
							boxSize="4"
							src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579"
						/>
						<Text fontSize="sm" width="8" lineHeight="5">
							BTC
						</Text>
						<Icon boxSize="4" as={IoIosArrowDown} />
					</Flex>
				</Button>
			</InputGroup>
		</Flex>
	);
};
