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
		if (Number(coin.change?.toFixed(2)) > 0)
			return {
				color: 'green.400',
				variance: '+',
			};
		if (Number(coin.change?.toFixed(2)) === 0) return { color, variance: '' };
		return { color: 'red.500', variance: '' };
	};

	return (
		<Flex
			borderRadius="base"
			border="1px solid"
			bg={bg}
			borderColor={borderColor}
			_hover={{ boxShadow: 'xl' }}
			pl="2"
			pr={pr}
			pt="2"
			pb="1.5"
			transition="all 0.1s ease-in-out"
			w="28"
		>
			<Flex direction="column" w="max-content">
				<Flex align="center" gap="2">
					<Img src={coin.logo} boxSize={{ base: '5', xl: '6' }} />
					<Flex direction="column">
						<Text fontSize="xs" color={color}>
							{coin.symbol?.toUpperCase()}
						</Text>
						<Text fontSize="xs" color={color} whiteSpace="nowrap" maxW="10">
							${Number(coin.value?.toFixed(2)).toLocaleString('en-US')}
						</Text>
					</Flex>
				</Flex>
				<Text fontSize="xs" color={colorVariance().color}>
					{colorVariance().variance}
					{coin.change?.toFixed(2)}%
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCard;
