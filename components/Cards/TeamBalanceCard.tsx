import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import { BiDollarCircle } from 'react-icons/bi';
import useTranslation from 'next-translate/useTranslation';

export const TeamBalanceCard = () => {
	const theme = usePicasso();
	const { t: trans } = useTranslation('common');

	return (
		<Flex
			w="36"
			h="14"
			bg={theme.bg.bgCard}
			direction="column"
			rounded="lg"
			pl="4"
			justify="center"
			ml="6"
		>
			<Flex direction="row" alignItems="center">
				<Icon as={BiDollarCircle} mr="2" />
				<Flex direction="column">
					<Text fontSize="xs">{trans('teamOverall.balance')}</Text>
					<Text fontSize="md">$123,123.98</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default TeamBalanceCard;
