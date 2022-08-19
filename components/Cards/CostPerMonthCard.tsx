import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import useTranslation from 'next-translate/useTranslation';
import { TiDocumentText } from 'react-icons/ti';

export const CostPerMonthCard = () => {
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
				<Icon as={TiDocumentText} mr="2" />
				<Flex direction="column">
					<Text fontSize="xs">
						{trans('teamOverall.costPerMonthCard')}
						(30d)
					</Text>
					<Text fontSize="md">$600,00.00</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default CostPerMonthCard;
