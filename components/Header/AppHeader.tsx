import { Flex, Text } from '@chakra-ui/react';
import {
	ColorModeButton,
	NotificationButton,
	ProfileButton,
} from 'components/Buttons';
import { MarginLeftContainer } from 'containers';

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
		<Flex flexDirection="row" alignItems="center">
			<Flex flexDirection="column" mr="96">
				<MarginLeftContainer>
					<Flex direction="column">
						<Text fontSize="2xl">Good Night, Bradley</Text>

						<Text fontSize="md">
							Seems like market has been bulish. Your assets increased 10%
						</Text>
					</Flex>
				</MarginLeftContainer>
			</Flex>
		</Flex>
		<Flex pr="12">
			<Flex mr="2">
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
