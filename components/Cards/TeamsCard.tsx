import { Flex, Img, Link, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { ITeamsData } from 'types';
import { handleLogoImage, navigationPaths } from 'utils';
import NextLink from 'next/link';

interface ITeamsCard {
	team: ITeamsData;
}

export const TeamsCard: React.FC<ITeamsCard> = ({ team }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('company-overall');
	return (
		<Flex
			borderColor={theme.bg.primary}
			borderWidth="0.1rem"
			borderRadius="base"
			direction="column"
			bgColor="gray.100"
			w="100%"
		>
			<Flex
				direction="column"
				pt="2.5"
				pl="4"
				color={theme.text.primary}
				pr="12"
			>
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
							{translate('funds')}
						</Text>
						<Text fontSize="sm" color={theme.text.primary}>
							${team.balance.toLocaleString('en-US')}
						</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize="xs" color="gray.500">
							{translate('members')}
						</Text>
						<Text fontSize="sm" color={theme.text.primary}>
							{team.members}
						</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" py="1" pb="3">
				<Link
					href={navigationPaths.dashboard.companies.team('1', '1')}
					as={NextLink}
				>
					<Flex
						color={theme.text.black}
						bg="white"
						fontSize="xs"
						fontWeight="medium"
						px="16"
						h="6"
						align="center"
					>
						<Text>Manage</Text>
					</Flex>
				</Link>
			</Flex>
		</Flex>
	);
};

export default TeamsCard;
