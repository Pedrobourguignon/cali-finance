import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfilePopover } from 'components';
import { useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { SandwichMenu } from './SandwichMenu';

export const AppHeader: React.FC = () => {
	const { name } = useProfile();
	const { t: translate } = useTranslation('appHeader');

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
			<Flex flexDirection="row" alignItems="center">
				<Flex
					direction={{ base: 'row', md: 'column' }}
					ml={{ base: '0', md: '40', xl: '40' }}
				>
					<Text
						fontSize={{ base: '3xl', xl: '2xl' }}
						whiteSpace="nowrap"
						display={{ base: 'none', sm: 'none', md: 'flex' }}
					>
						Good Night, {name}
					</Text>
					<Text
						fontSize="md"
						display={{ base: 'none', sm: 'none', md: 'none', xl: 'flex' }}
						whiteSpace="nowrap"
					>
						{translate('assetInfo')}
					</Text>
				</Flex>
			</Flex>
			<Flex display={{ base: 'flex', sm: 'flex', md: 'none' }}>
				<SandwichMenu />
			</Flex>
			<Flex direction="row" gap="10">
				<Flex display={{ base: 'none', sm: 'none', md: 'flex' }}>
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
