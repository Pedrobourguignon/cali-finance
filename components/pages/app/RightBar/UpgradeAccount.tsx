import { Flex, Text } from '@chakra-ui/react';
import {
	StarIcon,
	InfosBanner,
	ActiveTeamsBar,
	OffsetButton,
} from 'components';

export const UpgradeAccount = () => (
	<InfosBanner>
		<Flex direction="column" px="4" py="4" gap="14">
			<ActiveTeamsBar />
			<Flex direction="column" maxW="60" gap="5">
				<Flex direction="column" gap="2">
					<Text fontSize="md" fontWeight="medium">
						Upgrade Account
					</Text>
					<Text fontSize="sm" fontWeight="normal">
						Unlock our all-in-one suit for surfacing unlimited teams and
						companies payments
					</Text>
				</Flex>
				<Flex px="2">
					<OffsetButton icon={StarIcon} name="Upgrade Account" route="" />
				</Flex>
			</Flex>
		</Flex>
	</InfosBanner>
);
