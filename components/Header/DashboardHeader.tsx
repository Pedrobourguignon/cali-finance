/* eslint-disable consistent-return */
import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton } from 'components';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

export const DashboardHeader: React.FC = () => {
	const { t: translate } = useTranslation('app-header');
	const isConnected = true;
	const percentage = 0;
	const name = 'Bradley';

	const greetingMessage = useMemo(() => {
		const hour = new Date().getHours();
		if (hour < 6) return translate('greetings.night');
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	}, [translate]);

	const dynamicAssetInfo = () => {
		if (percentage < 0)
			return { status: translate('bearish'), color: 'red.500' };
		if (percentage === 0)
			return { status: translate('neutral'), color: 'gray.500' };
		if (percentage > 0)
			return { status: translate('bullish'), color: 'blue.500' };
	};

	return (
		<Flex direction="row" justify="space-between" h="max-content" pb="4">
			<Flex flexDirection="column" gap="1.5">
				<Flex>
					<Text
						color="black"
						fontSize="2xl"
						fontWeight="500"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage} {isConnected ? name : ''}
					</Text>
				</Flex>
				<Flex>
					<Text fontSize="sm" color="black">
						{translate('assetInfo')}
						<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
							{'\u00A0'}
							{dynamicAssetInfo()?.status}
							{'\u00A0'}
						</Text>
					</Text>

					<Text fontSize="sm" color="black">
						{translate('increased')}
						<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
							{'\u00A0'}
							{translate('percentage', { percentage })}
						</Text>
					</Text>
				</Flex>
			</Flex>
			<NotificationButton />
		</Flex>
	);
};

export default DashboardHeader;
