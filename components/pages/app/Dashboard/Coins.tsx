import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NewCoinButton, CoinCard, TokenSelector } from 'components';
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso, useProfile } from 'hooks';

export const Coins = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [flexWidth, setFlexWidth] = useState<number>();
	const { setSelectedToken, cardItems } = useProfile();

	const setInitialWidth = () => {
		if (window.innerWidth < 1200) setFlexWidth(2);
		else if (window.innerWidth > 1200 && window.innerWidth < 1390)
			setFlexWidth(3);
		else if (window.innerWidth > 1391 && window.innerWidth < 1560)
			setFlexWidth(4);
		else if (window.innerWidth > 1561 && window.innerWidth < 1690)
			setFlexWidth(5);
		else if (window.innerWidth > 1691 && window.innerWidth < 1820)
			setFlexWidth(6);
		else if (window.innerWidth > 1821 && window.innerWidth < 1900)
			setFlexWidth(7);
	};

	useEffect(() => {
		window.onresize = () => {
			if (window.innerWidth < 1200) setFlexWidth(2);
			else if (window.innerWidth > 1200 && window.innerWidth < 1390)
				setFlexWidth(3);
			else if (window.innerWidth > 1391 && window.innerWidth < 1560)
				setFlexWidth(4);
			else if (window.innerWidth > 1561 && window.innerWidth < 1690)
				setFlexWidth(5);
			else if (window.innerWidth > 1691 && window.innerWidth < 1820)
				setFlexWidth(6);
			else if (window.innerWidth > 1821 && window.innerWidth < 1900)
				setFlexWidth(7);
		};
	}, [() => window.onresize]);

	useEffect(() => {
		setInitialWidth();
	}, []);

	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			py="3"
			px={{ md: '3', xl: '4' }}
			borderRadius="base"
			align="center"
			minW={{ md: '33.713rem', '2xl': '43.5rem' }}
			minH={{ md: '5rem', lg: '6.44rem' }}
		>
			<TokenSelector
				setToken={setSelectedToken}
				isOpen={isOpen}
				onClose={onClose}
			/>
			<Flex direction="column" gap={{ md: '1', xl: '1.5' }}>
				<Text
					fontSize={{ md: 'sm', xl: 'md' }}
					fontWeight="medium"
					lineHeight="6"
				>
					{translate('coins')}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					fontWeight="medium"
					lineHeight="5"
					whiteSpace="nowrap"
				>
					{translate('stayConnected')}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					fontWeight="normal"
					lineHeight="5"
				>
					{translate('principalCoins')}
				</Text>
			</Flex>
			<Flex justify="flex-start" mx="4" flex="1" gap={{ md: '4', '2xl': '4' }}>
				{cardItems.slice(0, flexWidth).map((card, index) => (
					<CoinCard
						coin={card}
						borderColor="gray.100"
						color="white"
						pr={{ md: '2', xl: '9' }}
						key={+index}
					/>
				))}
			</Flex>
			<Flex>
				<NewCoinButton onOpen={onOpen} />
			</Flex>
		</Flex>
	);
};

export default Coins;
