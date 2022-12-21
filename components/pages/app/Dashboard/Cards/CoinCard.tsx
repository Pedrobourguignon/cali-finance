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
			gap="1"
			pl="3"
			py="2"
			pr="9"
			alignItems="flex-start"
			transition="all 0.1s ease-in-out"
		>
			<Flex direction="row" align="center" gap="2">
				<Img src={coin.icon} boxSize="6" />
				<Flex direction="column">
					<Text fontSize="xs" color={color}>
						{coin.name}
					</Text>
					<Text fontSize="xs" color={color}>
						{coin.value}
					</Text>
				</Flex>
			</Flex>
			<Text fontSize="xs" color={varianceColor()}>
				{coin.variation > 0 && '+'}
				{coin.variation}%
			</Text>
		</Flex>
	);
};

export default CoinCard;
