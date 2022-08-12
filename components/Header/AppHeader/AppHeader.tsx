import { Flex, Text } from '@chakra-ui/react';
import { ColorModeButton, NotificationButton, ProfileButton } from 'components';

const AppHeader: React.FC = () => (
	<Flex
		minW="100vw"
		minH="20"
		flexDirection="row"
		justifyContent="space-between"
		alignItems="center"
		color="white"
		mt="3"
	>
		<Flex flexDirection="row" ml="40" alignItems="center">
			<Flex flexDirection="column" mr="96">
				<Flex>
					<Text fontSize="2xl">Good Night, Bradley</Text>
				</Flex>
				<Flex>
					<Text fontSize="md">
						Seems like market has been bulish. Your assets increased 10%
					</Text>
				</Flex>
			</Flex>
		</Flex>
		<Flex pr="12">
			<Flex>
				<NotificationButton />
			</Flex>
			<Flex>
				<ColorModeButton />
			</Flex>
			<Flex ml="32">
				<ProfileButton />
			</Flex>
		</Flex>
	</Flex>
);

export default AppHeader;
