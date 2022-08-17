import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfilePopover } from 'components';
import { useProfile } from 'hooks';

export const AppHeader: React.FC = () => {
	const { name } = useProfile();
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
				<Flex
					direction={{ base: 'row', md: 'column', xl: 'column' }}
					ml="40"
					mr="96"
				>
					<Text fontSize="2xl" whiteSpace="nowrap">
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
