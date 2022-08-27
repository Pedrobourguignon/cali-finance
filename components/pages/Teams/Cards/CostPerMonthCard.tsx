import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import useTranslation from 'next-translate/useTranslation';
import { TiDocumentText } from 'react-icons/ti';

export const CostPerMonthCard: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');

	const costPerMonth = '$600,000.00';
	return (
		<Flex
			w="36"
			h="14"
			bg={theme.bg.card}
			direction="column"
			rounded="lg"
			pl="4"
			justify="center"
		>
			<Flex direction="row" alignItems="center">
				<Icon as={TiDocumentText} mr="2" />
				<Flex direction="column">
					<Text fontSize="xs">
						{translate('teamOverall.costPerMonthCard')}
						(30d)
					</Text>
					<Text fontSize="md">{costPerMonth}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default CostPerMonthCard;
