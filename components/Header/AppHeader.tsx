import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfilePopover } from 'components';
import { useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const AppHeader: React.FC = () => {
	const { name } = useProfile();
	const { t: trans } = useTranslation('common');

	return (
		<Flex
			minW="100vw"
			minH="20"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			color="white"
			mt="4"
		>
			<Flex flexDirection="row" alignItems="center">
				<Flex flexDirection="column" ml="40" mr="96">
					<Flex direction="column">
						<Text fontSize="2xl">{trans('salutation')}</Text>

						<Text fontSize="md">{trans('assetInfo')}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex pr="12">
				<Flex>
					<NotificationButton />
				</Flex>

				<Flex ml="32">
					<ProfilePopover />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AppHeader;
