import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import { BiDollarCircle } from 'react-icons/bi';
import useTranslation from 'next-translate/useTranslation';
import { useTeams } from 'hooks';

export const TeamBalanceCard: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');
	const { teams } = useTeams();

	return (
		<Flex
			w="36"
			h="14"
			bg={theme.bg.bgCard}
			direction="column"
			rounded="lg"
			pl="4"
			justify="center"
		>
			<Flex direction="row" alignItems="center">
				<Icon as={BiDollarCircle} mr="2" />
				<Flex direction="column">
					<Text fontSize="xs">{translate('teamOverall.balance')}</Text>
					<Text fontSize="md">{teams[0].balance}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default TeamBalanceCard;
