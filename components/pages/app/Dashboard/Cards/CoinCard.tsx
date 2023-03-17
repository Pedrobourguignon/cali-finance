import { Flex, FlexProps, Img, Text } from '@chakra-ui/react';
import { ICoin } from 'types';

interface ICoinCard extends FlexProps {
	coin: ICoin;
}

export const CoinCard: React.FC<ICoinCard> = ({
	coin,
	bg,
	pr,
	borderColor,
	color,
}) => {
	const colorVariance = () => {
		if (coin.change! > 0) return 'green.400';
		if (!coin.change) return color;
		return 'red.500';
	};

	return (
		<Flex
			borderRadius="base"
			border="1px solid"
			bg={bg}
			borderColor={borderColor}
			_hover={{ boxShadow: 'xl' }}
			pl={{ md: '2', xl: '3' }}
			pr={pr}
			pt="2"
			pb="1.5"
			transition="all 0.1s ease-in-out"
			w="max-content"
		>
			<Flex direction="column" w="max-content">
				<Flex align="center" gap="2">
					<Img src={coin.logo} boxSize={{ md: '5', xl: '6' }} />
					<Flex direction="column">
						<Text fontSize="xs" color={color}>
							{coin.symbol?.toUpperCase()}
						</Text>
						<Text fontSize="xs" color={color}>
							${coin.value?.toLocaleString('en-US')}
						</Text>
					</Flex>
				</Flex>
				<Text fontSize="xs" color={colorVariance()}>
					{coin.change! > 0 && '+'}
					{coin.change?.toFixed(1)}%
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCard;
