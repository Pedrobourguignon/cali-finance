import {
	Button,
	Flex,
	Icon,
	Img,
	Input,
	InputGroup,
	Select,
	Text,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { IoIosArrowDown } from 'react-icons/io';
import { ICompany } from 'types/interfaces/main-server/ICompany';

interface ISelectedCoin {
	coin: { logo?: string; symbol: string };
	onOpen: () => void;
	userCompanies: ICompany[];
}

export const WithdrawContent: React.FC<ISelectedCoin> = ({
	coin,
	onOpen,
	userCompanies,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');

	return (
		<Flex direction="column" gap="4">
			<Flex direction="column" gap="2">
				<Text color="black" fontSize="sm">
					{translate('companies')}
				</Text>
				<Select
					borderWidth="1px"
					borderStyle="solid"
					borderColor={theme.bg.primary}
					color="blackAlpha.500"
					_hover={{}}
					h="8"
				>
					<option disabled selected style={{ background: 'white' }}>
						{translate('selectAOrg')}
					</option>
					{userCompanies?.map((org, index) => (
						<option
							style={{ background: 'white', color: theme.text.primary }}
							key={+index}
							color="black"
						>
							{org.name}
						</option>
					))}
				</Select>
			</Flex>
			<Flex direction="column" gap="2">
				<Text color="black" fontSize="sm">
					{translate('amount')}
				</Text>
				<InputGroup h="max-content">
					<Input
						_placeholder={{
							color: 'blackAlpha.500',
							fontSize: { lg: 'xs', xl: 'sm' },
						}}
						placeholder="0.00"
						borderColor={theme.bg.primary}
						flex="3"
						borderRightRadius="none"
						_hover={{}}
						color="blackAlpha.500"
						type="number"
						h="8"
					/>
					<Button
						p="0"
						borderLeftRadius="none"
						bg={theme.bg.primary}
						_hover={{ opacity: '80%' }}
						_active={{}}
						_focus={{}}
						onClick={onOpen}
						w={{ lg: '50%', xl: '40%' }}
						h="8"
					>
						<Flex gap="2" align="center">
							<Img boxSize={{ lg: '4' }} src={coin.logo} />
							<Text
								fontSize={{ lg: 'xs', xl: 'sm' }}
								width={{ lg: '6', xl: '8' }}
								lineHeight="5"
							>
								{coin.symbol}
							</Text>
							<Icon boxSize={{ lg: '2', xl: '4' }} as={IoIosArrowDown} />
						</Flex>
					</Button>
				</InputGroup>
			</Flex>
		</Flex>
	);
};
