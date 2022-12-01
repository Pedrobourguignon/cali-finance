import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	InputGroup,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IoIosArrowDown } from 'react-icons/io';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface ISelectedCoin {
	coin: { logo: string; symbol: string };
}

export const WithdrawContent: React.FC<ISelectedCoin> = ({ coin }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');

	const orgs = ['Kylie Cosmetics', 'Kylie Skin', 'Kylie Baby'];

	return (
		<Flex direction="column" gap="4">
			<Flex direction="column" gap="2">
				<Text color="black" fontSize="sm">
					{translate('organizations')}
				</Text>
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<ChevronDownIcon boxSize="6" color="black" />}
						bgColor="transparent"
						color="blackAlpha.500"
						fontWeight="normal"
						textAlign="start"
						borderWidth="1px"
						borderStyle="solid"
						borderColor={theme.bg.primary}
						px="3"
					>
						Please select a org
					</MenuButton>
					<MenuList
						bgColor="white"
						borderWidth="1px"
						borderStyle="solid"
						borderColor={theme.bg.primary}
					>
						{orgs.map((org, index) => (
							<MenuItem key={+index} color="black">
								{org}
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>
			<Flex direction="column" gap="2">
				<Text color="black" fontSize="sm">
					{translate('amount')}
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
						type="number"
					/>
					<Button
						borderLeftRadius="none"
						bg={theme.bg.primary}
						_hover={{ opacity: '80%' }}
						_active={{}}
						_focus={{}}
					>
						<Flex gap="2" align="center">
							<Img boxSize="4" src={coin.logo} />
							<Text fontSize="sm" width="8" lineHeight="5">
								{coin.symbol}
							</Text>
							<Icon boxSize="4" as={IoIosArrowDown} />
						</Flex>
					</Button>
				</InputGroup>
			</Flex>
		</Flex>
	);
};
