import { Flex, Text } from '@chakra-ui/react';
import {
	ColorModeButton,
	NotificationButton,
	ProfileButton,
} from 'components/Buttons';
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
				<Flex flexDirection="column" ml="40" mr="96">
					<Flex direction="column">
						<Text fontSize="2xl">Good Night, {name}</Text>

						<Text fontSize="md">
							Seems like market has been bullish. Your assets increased 10%
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
};

export default AppHeader;
