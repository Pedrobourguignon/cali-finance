import { Flex, FlexProps, Img, Text } from '@chakra-ui/react';
import { ICoin } from 'types';

interface ICoinCardMobile extends FlexProps {
	coin: ICoin;
}

export const CoinCardMobile: React.FC<ICoinCardMobile> = ({
	coin,
	bg,
	pr,
	borderColor,
	color,
}) => {
	const colorVariance = () => {
		if (coin.variation > 0) return 'green.400';
		if (!coin.variation) return color;
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
			w="full"
		>
			<Flex gap="5" bg="transparent" w="full" justify="space-between">
				<Flex align="center" gap="2" pl="2">
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
				<Text fontSize="xs" color={colorVariance()} pr="3">
					{coin.variation > 0 && '+'}
					{coin.variation}%
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCardMobile;
