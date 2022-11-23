import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface ITeams {
	quantity: number;
}
export const SurplusTeams: React.FC<ITeams> = ({ quantity }) => {
	const theme = usePicasso();
	return (
		<Flex
			rounded="full"
			boxSize="6"
			bg={theme.text.black}
			justify="center"
			align="center"
		>
			<Text fontSize="xs">+{quantity}</Text>
		</Flex>
	);
};
