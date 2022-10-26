import { Button, Flex, Img, Text } from '@chakra-ui/react';
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
		<Flex boxShadow="lg">
			<Flex direction="column" px="1">
				<Flex align="center" gap="2.5" px="4" py="2.5">
					<Img src="/icons/organizations.svg" boxSize="6" />
					<Text fontSize="md" fontWeight="bold" color="black">
						{teamName}
					</Text>
				</Flex>
				<Flex gap="12" px="4">
					<Flex direction="column" color="black">
						<Text fontSize="sm" color="gray.500">
							{' '}
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

				<Button color={theme.branding.blue} bg="none" fontSize="xs">
					Manage
				</Button>
			</Flex>
		</Flex>
	);
};

export default TeamCard;
