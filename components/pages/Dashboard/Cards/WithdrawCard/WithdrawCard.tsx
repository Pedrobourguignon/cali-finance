import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { WithdrawButton, TokenSelector, WithdrawContent } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { ISelectedCoin } from 'types';

export const WithdrawCard = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [token, setToken] = useState<ISelectedCoin>({
		logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
		symbol: 'BTC',
	} as ISelectedCoin);

	return (
		<Flex
			bg="white"
			direction="column"
			p="6"
			gap="4"
			borderRadius="base"
			borderWidth="0.1rem"
			borderColor={theme.bg.primary}
		>
			<TokenSelector isOpen={isOpen} onClose={onClose} setToken={setToken} />
			<Flex w="100%" justify="space-between" align="center">
				<Text
					color={theme.text.black}
					fontWeight="semibold"
					fontSize={{ lg: 'lg', xl: 'xl' }}
				>
					$ {translate('withdraw')}
				</Text>
			</Flex>
			<WithdrawContent coin={token} onOpen={onOpen} />
			<WithdrawButton />
		</Flex>
	);
};
