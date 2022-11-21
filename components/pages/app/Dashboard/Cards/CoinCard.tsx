import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import { ICoinCard } from 'types';

export const CoinCard: React.FC<ICoinCard> = ({
	icon,
	name,
	value,
	variation,
}) => {
	const theme = usePicasso();

	return (
		<Flex
			borderRadius="base"
			border="1px solid"
			direction="column"
			justify="center"
		>
			<Flex direction="row" align="center" gap="2" pl="3" pr="9">
				<Img src={icon} boxSize="6" />
				<Flex direction="column" py="2">
					<Text fontSize="xs" color={theme.text.white}>
						{name}
					</Text>
					<Text fontSize="xs" color={theme.text.white}>
						{value}
					</Text>
				</Flex>
			</Flex>
			<Flex px="3">
				<Text fontSize="xs" color="green.400">
					{variation}
				</Text>
			</Flex>
		</Flex>
	);
};

export default CoinCard;
