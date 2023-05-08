import { Flex, Grid, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton, TokenSelectorMobile, CoinCardMobile } from 'components';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso, useProfile } from 'hooks';

export const CoinsMobile = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { setSelectedToken, cardItems } = useProfile();

	return (
		<Flex
			w="full"
			h="full"
			bg={theme.text.primary}
			borderRadius="base"
			boxShadow="md"
		>
			<TokenSelectorMobile
				setToken={setSelectedToken}
				isOpen={isOpen}
				onClose={onClose}
			/>
			<Flex px="4" pt="3" direction="column" gap="1.5" w="full">
				<Text fontWeight="medium">{translate('coins')}</Text>
				<Text fontSize="sm" lineHeight="5">
					{translate('stayConnectedMobile')}
				</Text>
				<Grid templateColumns="repeat(2, 1fr)" gap="2" pt="2">
					{cardItems.map((card, index) => (
						<CoinCardMobile
							coin={card}
							borderColor="gray.100"
							color="white"
							pr={{ md: '2', xl: '9' }}
							key={+index}
						/>
					))}
				</Grid>
				<Flex>
					<Flex w="full" justify="center" pl="1" pt="4" pb="6">
						<NewCoinButton onOpen={onOpen} />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CoinsMobile;
