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
		<Flex w="28" borderRadius="base" border="2px solid" direction="column">
			<Flex direction="row" align="center" gap="2" ml="3">
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
			<Text fontSize="xs" color="green.400">
				{variation}
			</Text>
		</Flex>
	);
};

export default CoinCard;
