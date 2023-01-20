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
			direction="column"
			justify="center"
			borderColor={borderColor}
			_hover={{ boxShadow: 'xl' }}
			gap={{ md: '1' }}
			pl={{ md: '1', lg: '2', xl: '3' }}
			py={{ md: '0', xl: '2' }}
			pr={{ md: '2', lg: '10', xl: '8' }}
			alignItems="flex-start"
			transition="all 0.1s ease-in-out"
		>
			<Flex direction="row" align="center" gap={{ xl: '2' }}>
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
	);
};

export default CoinCard;
