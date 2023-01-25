import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NotificationPopover } from 'components';
import { INotificationList } from 'types';
import { useState, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';

export const DashboardHeader: React.FC = () => {
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('app-header');
	const isConnected = true;
	const percentage = 0;
	const name = 'Bradley';
	const theme = usePicasso();

	const greetingMessage = useMemo(() => {
		const hour = new Date().getHours();
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	}, [translate]);

	const dynamicAssetInfo = () => {
		if (percentage < 0)
			return { status: translate('bearish'), color: 'red.500' };
		if (percentage === 0)
			return { status: translate('neutral'), color: 'gray.500' };
		return { status: translate('bullish'), color: 'blue.500' };
	};

	const [notificationsList, setNotificationsList] = useState<
		INotificationList[]
	>([
		{
			type: 'You made a deposit of $23,456.02',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'You created Kylie Cosmetics',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: '0x6856...BF99 added to Kylie Baby',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
		{
			type: 'Marketing Team created Kylie Skin',
			date: '08 Aug 22, 20:57',
			icon: '/icons/deposit.svg',
		},
	]);

	return (
		<Flex direction="column" pb={{ md: '0', xl: '4' }}>
			<Flex justify="space-between">
				<Flex>
					<Text
						color={theme.text.primary}
						fontSize={{ md: 'sm', lg: 'xl', xl: '2xl', '2xl': '3xl' }}
						fontWeight="medium"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage} {isConnected && name}
					</Text>
				</Flex>
				<Flex display={{ base: 'none', md: 'flex' }} h="8" align="center">
					<NotificationPopover
						setNotificationsList={setNotificationsList}
						onClose={onClose}
						isOpen={isOpen}
						onOpen={onOpen}
						notificationsList={notificationsList}
					/>
				</Flex>
			</Flex>
			<Flex>
				<Text
					fontSize={{ sm: 'xs', xl: 'sm', '2xl': 'md' }}
					color={theme.text.primary}
				>
					{translate('assetInfo')}
					<Text
						as="span"
						fontSize={{ sm: 'xs', xl: 'sm', '2xl': 'md' }}
						color={dynamicAssetInfo()?.color}
					>
						{'\u00A0'}
						{dynamicAssetInfo()?.status}
						{'\u00A0'}
					</Text>
				</Text>

				<Text
					fontSize={{ sm: 'xs', xl: 'sm', '2xl': 'md' }}
					color={theme.text.primary}
				>
					{translate('increased')}
					<Text
						as="span"
						fontSize={{ sm: 'xs', xl: 'sm', '2xl': 'md' }}
						color={dynamicAssetInfo()?.color}
					>
						{'\u00A0'}
						{translate('percentage', { percentage })}
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
};

export default DashboardHeader;
