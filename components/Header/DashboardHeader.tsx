import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NotificationPopover } from 'components';
import { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useAuth, usePicasso, useProfile, useTokens } from 'hooks';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';
import { truncateWallet } from 'utils';

export const DashboardHeader: React.FC = () => {
	const { onClose, isOpen, onOpen } = useDisclosure();
	const { t: translate } = useTranslation('app-header');
	const { session } = useAuth();
	const { isConnected } = useAccount();
	const { getProfileData } = useProfile();
	const { getCoinServiceTokens } = useTokens();
	const symbols = ['usdt'];
	const theme = usePicasso();
	const { address } = useAccount();

	const { data: profileData } = useQuery(
		'profile-data',
		() => getProfileData(address),
		{
			enabled: Boolean(isConnected && session),
		}
	);

	const { data: coinServiceTokens } = useQuery(['get-coin-data'], () =>
		getCoinServiceTokens(symbols.toString())
	);

	const variation = coinServiceTokens?.USDT.change;

	const greetingMessage = useMemo(() => {
		const hour = new Date().getHours();
		if (hour >= 6 && hour < 12) return translate('greetings.morning');
		if (hour >= 12 && hour < 18) return translate('greetings.afternoon');
		return translate('greetings.night');
	}, [translate]);

	const dynamicAssetInfo = () => {
		if (variation && variation < 0)
			return { status: translate('bearish'), color: 'red.500' };
		if (!variation && variation === 0)
			return { status: translate('neutral'), color: 'gray.500' };
		return { status: translate('bullish'), color: 'blue.500' };
	};

	const handleDisplayedProfileName = () => {
		if (profileData?.name === '' || profileData?.name.length === 42) {
			return truncateWallet(profileData?.wallet);
		}
		return profileData?.name;
	};

	return (
		<Flex direction="column" pb="6">
			<Flex justify="space-between">
				<Flex>
					<Text
						display={{ base: 'none', md: 'flex' }}
						color={theme.text.primary}
						fontSize="2xl"
						fontWeight="medium"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage} {session && handleDisplayedProfileName()}
					</Text>
					<Text
						display={{ base: 'flex', md: 'none' }}
						color={theme.text.primary}
						fontSize="2xl"
						fontWeight="medium"
						lineHeight="8"
						fontStyle="normal"
					>
						{greetingMessage}
					</Text>
				</Flex>
				<Flex display={{ base: 'none', md: 'flex' }} h="8" align="center">
					<NotificationPopover
						onClose={onClose}
						isOpen={isOpen}
						onOpen={onOpen}
					/>
				</Flex>
			</Flex>
			<Flex display={{ base: 'none', md: 'flex' }}>
				<Text fontSize="sm" color={theme.text.primary}>
					{translate('assetInfo')}
					<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
						{'\u00A0'}
						{dynamicAssetInfo()?.status}
						{'\u00A0'}
					</Text>
				</Text>
				<Text fontSize="sm" color={theme.text.primary}>
					{translate('increased')}
					<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
						{'\u00A0'}
						{variation}%
					</Text>
				</Text>
			</Flex>
			<Flex display={{ base: 'flex', md: 'none' }}>
				<Text fontSize="sm" color={theme.text.primary}>
					{translate('assetInfo')}
					<Text as="span" fontSize="sm" color={dynamicAssetInfo()?.color}>
						{'\u00A0'}
						{dynamicAssetInfo()?.status}
						{'\u00A0'}
						<Text as="span" color={theme.text.primary}>
							{translate('increased')}
						</Text>
						{'\u00A0'}
						{variation}%
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
};

export default DashboardHeader;
