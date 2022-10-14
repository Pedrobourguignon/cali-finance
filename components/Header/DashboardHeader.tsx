import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton } from 'components/Buttons';
import useTranslation from 'next-translate/useTranslation';

export const DashboardHeader: React.FC = () => {
	const { t: translate } = useTranslation('app-header');

	const greetingMessage = () => {
		const hour = new Date().getHours();
		if (hour < 6) return translate('greetings.night');
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	};

	return (
		<Flex direction="row" justify="space-between" my="4">
			<Flex direction="column" gap="1.5">
				<Text
					color="black"
					fontSize="2xl"
					fontWeight="500"
					lineHeight="8"
					fontStyle="normal"
				>
					{greetingMessage()}
				</Text>
				<Text fontSize="sm" fontWeight=" 400" lineHeight="5">
					{translate('loginMessage')}
				</Text>
			</Flex>
			<NotificationButton />
		</Flex>
	);
};

export default DashboardHeader;
