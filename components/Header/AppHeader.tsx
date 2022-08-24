/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfilePopover } from 'components';
import { useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { SandwichMenu } from './SandwichMenu';

export const AppHeader: React.FC = () => {
	const { name } = useProfile();
	const { t: translate } = useTranslation('app-header');
	const percentage = 0;

	const greetingMessage = () => {
		const hour = new Date().getHours();
		if (hour < 6) return translate('greetings.night');
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	};

	const dynamicAssetInfo = () => {
		if (percentage < 0)
			return { status: translate('bearish'), color: 'red.500' };
		if (percentage === 0)
			return { status: translate('neutral'), color: 'gray.500' };
		if (percentage > 0)
			return { status: translate('bullish'), color: 'blue.500' };
	};

	return (
		<Flex
			minW="100vw"
			minH="20"
			flexDirection="row"
			justifyContent={{
				base: 'center',
				md: 'space-between',
			}}
			alignItems="center"
			color="white"
			mt="4"
			gap="6"
		>
			<Flex flexDirection="column">
				<Flex
					direction={{ base: 'row', md: 'column' }}
					ml={{ base: '0', md: '40', xl: '40' }}
				>
					<Text
						fontSize={{ base: '3xl', xl: '2xl' }}
						display={{ base: 'none', md: 'flex' }}
					>
						{greetingMessage()}, {name}
					</Text>
				</Flex>
				<Flex ml={{ base: '0', md: '40', xl: '40' }}>
					<Text fontSize="md" display={{ base: 'none', xl: 'flex' }}>
						{translate('assetInfo')}
						<Text
							as="span"
							fontSize="md"
							display={{ base: 'none', xl: 'flex' }}
							color={dynamicAssetInfo()?.color}
						>
							{'\u00A0'}
							{dynamicAssetInfo()?.status}
							{'\u00A0'}
						</Text>
					</Text>

					<Text fontSize="md" display={{ base: 'none', xl: 'flex' }}>
						{translate('increased')}
						<Text
							as="span"
							fontSize="md"
							display={{ base: 'none', xl: 'flex' }}
							color={dynamicAssetInfo()?.color}
						>
							{'\u00A0'}
							{translate('percentage', { percentage })}
						</Text>
					</Text>
				</Flex>
			</Flex>
			<Flex display={{ base: 'flex', md: 'none' }}>
				<SandwichMenu />
			</Flex>
			<Flex direction="row" gap="10">
				<Flex display={{ base: 'none', md: 'flex' }}>
					<NotificationButton />
				</Flex>
				<Flex>
					<ProfilePopover />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AppHeader;
