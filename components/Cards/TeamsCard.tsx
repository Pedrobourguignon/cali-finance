import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { ITeamsList } from 'types';
import { handleLogoImage } from 'utils';

interface ITeamsCard {
	team: ITeamsList;
}

export const TeamsCard: React.FC<ITeamsCard> = ({ team }) => {
	const theme = usePicasso();
	return (
		<Flex
			borderColor={theme.bg.primary}
			borderWidth="0.1rem"
			borderRadius="base"
			direction="column"
			w="60"
			bgColor="gray.50"
		>
			<Flex direction="column" pt="2.5" px="4" color={theme.text.primary}>
				<Flex align="center" gap="2.5">
					{team.logo ? (
						<Img
							alt={`${team.name} logo`}
							src={team.logo}
							boxSize="6"
							borderRadius="base"
						/>
					) : (
						<Flex
							boxSize="6"
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="xs"
							fontWeight="bold"
							bg={theme.bg.white2}
						>
							{handleLogoImage(team.name)}
						</Flex>
					)}
					<Text fontSize="md" fontWeight="bold">
						{team.name}
					</Text>
				</Flex>
				<Flex gap="12" pt="3" color={theme.text.primary}>
					<Flex direction="column">
						<Text fontSize="xs" color="gray.500">
							Funds
						</Text>
						<Text fontSize="sm" color={theme.text.primary}>
							${team.funds}
						</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize="xs" color="gray.500">
							Members
						</Text>
						<Text fontSize="sm" color={theme.text.primary}>
							{team.members}
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" py="1" pb="3">
				<Button
					color={theme.text.black}
					bg="white"
					fontSize="xs"
					fontWeight="medium"
					px="16"
					h="6"
				>
					Manage
				</Button>
			</Flex>
		</Flex>
	);
};

export default TeamsCard;
