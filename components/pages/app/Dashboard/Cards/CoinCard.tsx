import { Flex, FlexProps, Img, Text } from '@chakra-ui/react';
import { ICoin } from 'types';

interface ICoinCard extends FlexProps {
	coin: ICoin;
}

export const CoinCard: React.FC<ICoinCard> = ({ coin, borderColor, color }) => {
	const varianceColor = () => {
		if (coin.variation > 0) return 'green.400';
		if (coin.variation === 0) return color;
		return 'red.500';
	};

	return (
		<Flex
			borderRadius="base"
			border="1px solid"
			// direction="column"
			// justify="center"
			borderColor={borderColor}
			_hover={{ boxShadow: 'xl' }}
			// pl={{ md: '1', lg: '2', xl: '3', '2xl': '5' }}
			// pr={{ md: '2', lg: '8', xl: '8', '2xl': '24' }}
			transition="all 0.1s ease-in-out"
		>
			<Flex direction="column" bg="red">
				<Flex align="center" gap="2">
					<Img src={coin.icon} boxSize={{ md: '5', xl: '6' }} />
					<Flex direction="column">
						<Text fontSize={{ md: 'xs' }} color={color} pt="1">
							{coin.name}
						</Text>
						<Text fontSize={{ md: 'xs' }} color={color}>
							{coin.value}
						</Text>
					</Flex>
				</Flex>
				<Text fontSize={{ md: 'xs' }} color={varianceColor()}>
					{coin.variation > 0 && '+'}
					{coin.variation}%
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCard;
