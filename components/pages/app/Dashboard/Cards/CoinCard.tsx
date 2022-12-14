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
		>
			<Flex direction="row" align="center" gap="2" pl="3" pr="9">
				<Img src={coin.icon} boxSize="6" />
				<Flex direction="column" py="2">
					<Text fontSize="xs" color={color}>
						{coin.name}
					</Text>
					<Text fontSize="xs" color={color}>
						{coin.value}
					</Text>
				</Flex>
			</Flex>
			<Flex px="3">
				<Text fontSize="xs" color={varianceColor()}>
					{coin.variation > 0 && '+'}
					{coin.variation}%
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCard;
