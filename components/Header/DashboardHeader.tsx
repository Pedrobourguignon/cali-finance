import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton } from 'components/Buttons';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

export const DashboardHeader: React.FC = () => {
	const { t: translate } = useTranslation('app-header');

	const greetingMessage = useMemo(() => {
		const hour = new Date().getHours();
		if (hour < 6) return translate('greetings.night');
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	}, [translate]);

	return (
		<Flex
			w="max-content"
			direction="row"
			justify="space-between"
			h="max-content"
		>
			<Flex direction="column">
				<Text
					color="black"
					fontSize="2xl"
					fontWeight="medium"
					lineHeight="8"
					fontStyle="normal"
				>
					{greetingMessage}
				</Text>
				<Text fontSize="sm" lineHeight="5">
					{translate('loginMessage')}
				</Text>
			</Flex>
			<Flex px="20" />
			<NotificationButton />
		</Flex>
	);
};

export default DashboardHeader;
