import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { WithdrawButton, TokenSelector, WithdrawContent } from 'components';
import { usePicasso, useTokens } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export interface ISelectedCoin {
	logo: string;
	symbol: string;
}

const selectedCoin: ISelectedCoin = {
	logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
	symbol: 'BTC',
};

export const WithdrawCard = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { chosenToken } = useTokens();
	return (
		<Flex
			bg="white"
			direction="column"
			p="6"
			gap="6"
			borderRadius="base"
			borderWidth="0.1rem"
			borderColor={theme.bg.primary}
		>
			<TokenSelector isOpen={isOpen} onClose={onClose} />
			<Flex w="100%" justify="space-between" align="center">
				<Text color={theme.text.black} fontWeight="semibold" fontSize="xl">
					$ {translate('withdraw')}
				</Text>
			</Flex>
			<WithdrawContent coin={chosenToken} onOpen={onOpen} />
			<WithdrawButton />
		</Flex>
	);
};
