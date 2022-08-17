import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfilePopover } from 'components';
import { useProfile } from 'hooks';
import { SandwichMenu } from './SandwichMenu';

export const AppHeader: React.FC = () => {
	const { name } = useProfile();
	return (
		<Flex
			minW="100vw"
			minH="20"
			flexDirection="row"
			justifyContent={{ base: 'center', xl: 'space-between' }}
			alignItems="center"
			color="white"
			mt="4"
			gap={{ base: '6' }}
		>
			<Flex flexDirection="row" alignItems="center">
				<Flex
					direction={{ base: 'row', md: 'column', xl: 'column' }}
					ml={{ base: '0', md: '40', xl: '40' }}
				>
					<Text
						fontSize={{ base: '3xl', xl: '2xl' }}
						whiteSpace="nowrap"
						display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
					>
						Good Night, {name}
					</Text>
					<Text
						fontSize="md"
						display={{ base: 'none', sm: 'none', md: 'none', xl: 'flex' }}
						whiteSpace="nowrap"
					>
						Seems like market has been bullish. Your assets increased 10%
					</Text>
				</Flex>
			</Flex>
			<Flex display={{ base: 'flex', sm: 'flex', md: 'none', xl: 'none' }}>
				<SandwichMenu />
			</Flex>
			<Flex direction="row" gap="10">
				<Flex>
					<NotificationButton />
				</Flex>
				<Flex mr="12">
					<ProfilePopover />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AppHeader;
