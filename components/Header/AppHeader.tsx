import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfileButton } from 'components/Buttons';

export const AppHeader: React.FC = () => (
	<Flex
		minW="100vw"
		minH="20"
		flexDirection="row"
		justifyContent="space-between"
		alignItems="center"
		color="white"
		mt="4"
	>
		<Flex flexDirection="row" ml="32" alignItems="center">
			<Flex flexDirection="column" mr="96" ml="8">
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
		<Flex ml="52">
			<NotificationButton />
		</Flex>
		<Flex mr="12">
			<ProfileButton />
		</Flex>
	</Flex>
);

export default AppHeader;
