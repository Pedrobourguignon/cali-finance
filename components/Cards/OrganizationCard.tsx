import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import Link from 'next/link';
import React from 'react';
import { IOrganization } from 'types';
import { handleLogoImage, navigationPaths } from 'utils';

interface IOrganizationCard {
	team: IOrganization;
}

export const OrganizationCard: React.FC<IOrganizationCard> = ({ team }) => {
	const theme = usePicasso();
	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			w={{ md: '10.5rem', xl: '13.81rem' }}
			gap="4"
		>
			<Flex direction="column" pt="2.5" pl="4" color={theme.text.primary}>
				<Flex align="center" gap="2.5">
					{team.logo ? (
						<Img src={team.logo} boxSize="6" borderRadius="base" />
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
					<Text fontSize={{ md: 'sm', xl: 'md' }} fontWeight="bold">
						{team.name}
					</Text>
				</Flex>
				<Flex gap={{ md: '8', xl: '12' }} pt="3">
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							Funds
						</Text>
						<Text fontSize={{ md: 'xs', xl: 'sm' }}>
							${team.funds.toLocaleString('en-US')}
						</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color="gray.500">
							Members
						</Text>
						<Text fontSize={{ md: 'xs', xl: 'sm' }}>{team.members}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" pb="4">
				<Link href={navigationPaths.dashboard.organizations.overview('1')}>
					<Text
						color={theme.branding.blue}
						bg="none"
						fontSize="xs"
						fontWeight="medium"
						cursor="pointer"
					>
						Manage
					</Text>
				</Link>
			</Flex>
		</Flex>
	);
};

export default OrganizationCard;
