import { Flex, FlexProps, Img, Text } from '@chakra-ui/react';
import { ICoin } from 'types';

interface ICoinCard extends FlexProps {
	coin: ICoin;
}

export const CoinCardMobile: React.FC<ICoinCard> = ({
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
			pl={{ md: '2', xl: '3' }}
			pr={pr}
			pt="2"
			pb="1.5"
			transition="all 0.1s ease-in-out"
			w="full"
		>
			<Flex gap="5" bg="transparent" w="full" justify="space-between">
				<Flex align="center" gap="2" pl="2">
					<Img src={coin.logo} boxSize="6" />
					<Flex direction="column">
						<Text fontSize="xs" color={color}>
							{coin.symbol?.toUpperCase()}
						</Text>
						<Text fontSize="xs" color={color}>
							${coin.value?.toLocaleString('en-US')}
						</Text>
					</Flex>
				</Flex>
				<Text fontSize="xs" pr="3" color={colorVariance().color}>
					{colorVariance().variance}
					{coin.change?.toFixed(2)}%
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCardMobile;
