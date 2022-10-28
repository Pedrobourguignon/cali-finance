import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { OrganizationCardIcon } from 'components/Icons';
import { usePicasso } from 'hooks';
import React from 'react';

interface ITeamCard {
	teamName: string;
	funds: string;
	members: number;
}

export const TeamCard: React.FC<ITeamCard> = ({ teamName, funds, members }) => {
	const theme = usePicasso();
	return (
		<Flex boxShadow="lg" justify="center" bg="white" mr="2">
			<Flex direction="column">
				<Flex align="center" gap="2.5" py="2.5">
					<Icon as={OrganizationCardIcon} boxSize="6" color="black" />
					<Text fontSize="md" fontWeight="bold">
						{teamName}
					</Text>
				</Flex>
				<Flex gap="14" w="full">
					<Flex direction="column">
						<Text fontSize="sm" color="gray.500">
							Funds
						</Text>
						{funds}
					</Flex>
					<Flex direction="column" color="black">
						<Text fontSize="sm" color="gray.500">
							Members
						</Text>
						{members}
					</Flex>
				</Flex>
				<Button color={theme.branding.blue} bg="transparent" fontSize="xs">
					Manage
				</Button>
			</Flex>
		</Flex>
	);
};

export default TeamCard;
