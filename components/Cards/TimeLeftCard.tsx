import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import useTranslation from 'next-translate/useTranslation';
import { IoTimeOutline } from 'react-icons/io5';

export const TimeLeftCard = () => {
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
				<Icon as={IoTimeOutline} mr="2" />
				<Flex direction="column">
					<Text fontSize="xs">{trans('teamOverall.timeLeftCard')}</Text>
					<Text fontSize="md">10d 9h 8m</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
export default TimeLeftCard;
