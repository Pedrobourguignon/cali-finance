import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NotificationPopover } from 'components';
import { INotificationList } from 'types';
import { useState, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';

export const DashboardHeader: React.FC = () => {
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('app-header');
	const isConnected = true;
	const percentage = 0;
	const name = 'Bradley';

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
		<Flex
			direction="row"
			justify="space-between"
			h="max-content"
			pb={{ xl: '4' }}
			w="full"
		>
			<Flex flexDirection="column" gap={{ xl: '1.5' }}>
				<Flex>
					<Text
						color="black"
						fontSize={{ md: 'sm', lg: 'xl', xl: '2xl' }}
						fontWeight="500"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage} {isConnected ? name : ''}
					</Text>
				</Flex>
				<Flex>
					<Text fontSize={{ md: 'xs', lg: 'sm', '2xl': 'md' }} color="black">
						{translate('assetInfo')}
						<Text
							as="span"
							fontSize={{ md: 'xs', lg: 'sm' }}
							color={dynamicAssetInfo()?.color}
						>
							{'\u00A0'}
							{dynamicAssetInfo()?.status}
							{'\u00A0'}
						</Text>
					</Text>

					<Text fontSize={{ md: 'xs', lg: 'sm' }} color="black">
						{translate('increased')}
						<Text
							as="span"
							fontSize={{ md: 'xs', lg: 'sm' }}
							color={dynamicAssetInfo()?.color}
						>
							{'\u00A0'}
							{translate('percentage', { percentage })}
						</Text>
					</Text>
				</Flex>
			</Flex>
			<Flex display={{ base: 'none', md: 'flex', lg: 'flex' }}>
				<NotificationPopover
					setNotificationsList={setNotificationsList}
					onClose={onClose}
					isOpen={isOpen}
					onOpen={onOpen}
					notificationsList={notificationsList}
				/>
			</Flex>
		</Flex>
	);
};

export default DashboardHeader;
