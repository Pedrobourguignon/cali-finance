import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { IOrganization } from 'types';
import { handleLogoImage } from 'utils';

interface IOrganizationCard {
	team: IOrganization;
}

export const OrganizationCard: React.FC<IOrganizationCard> = ({ team }) => {
	const theme = usePicasso();
	return (
		<Flex boxShadow="lg" bg="white" borderRadius="base" direction="column">
			<Flex direction="column" pt="2.5" pr="9" pl="4">
				<Flex align="center" gap="2.5">
					{team.logo ? (
						<Img src={team.logo} boxSize="6" borderRadius="base" />
					) : (
						<Flex
							boxSize="6"
							color="black"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="xs"
							fontWeight="bold"
							bg={theme.bg.white2}
						>
							{handleLogoImage(team.logo, team.name)}
						</Flex>
					)}
					<Text fontSize="md" fontWeight="bold" color="black">
						{team.name}
					</Text>
				</Flex>
				<Flex gap="12">
					<Flex direction="column" color="black">
						<Text fontSize="sm" color="gray.500">
							Funds
						</Text>
						<Text fontSize="sm">{team.funds.toLocaleString('en-US')}</Text>
					</Flex>
					<Flex direction="column" color="black">
						<Text fontSize="sm" color="gray.500">
							Members
						</Text>
						<Text fontSize="sm">{team.members}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center">
				<Button color={theme.branding.blue} bg="none" fontSize="xs" py="4">
					Manage
				</Button>
			</Flex>
		</Flex>
	);
};

export default OrganizationCard;
