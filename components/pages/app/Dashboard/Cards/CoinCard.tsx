import { Flex, FlexProps, Img, Text } from '@chakra-ui/react';
import { ICoin } from 'types';

interface ICoinCard extends FlexProps {
	coin: ICoin;
}

export const CoinCard: React.FC<ICoinCard> = ({
	coin,
	borderColor,
	color,
	bg,
}) => {
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
			bg={bg}
			justify="center"
			borderColor={borderColor}
			_hover={{ boxShadow: 'xl' }}
			gap={{ lg: '1' }}
			pl={{ lg: '2', xl: '3' }}
			py={{ lg: '1', xl: '2' }}
			pr={{ lg: '10', xl: '8' }}
			alignItems="flex-start"
			transition="all 0.1s ease-in-out"
		>
			<Flex direction="row" align="center" gap={{ xl: '2' }}>
				<Img src={coin.icon} boxSize={{ xl: '6' }} />
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
