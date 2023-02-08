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
	const varianceColor = () => {
		if (coin.variation > 0) return 'green.400';
		if (coin.variation === 0) return color;
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
					<Img src={coin.icon} boxSize={{ md: '5', xl: '6' }} />
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
		</Flex>
	);
};

export default CoinCard;
