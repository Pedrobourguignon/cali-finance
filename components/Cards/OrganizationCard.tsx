import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { IOrganization } from 'types';
import { handleLogoImage } from 'utils';

interface IOrganizationCard {
	team: IOrganization;
}

export const OrganizationCard: React.FC<IOrganizationCard> = ({ team }) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('organizations');

	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			w="56"
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
					<Text fontSize="md" fontWeight="bold">
						{team.name}
					</Text>
				</Flex>
				<Flex gap="12" pt="3">
					<Flex direction="column">
						<Text fontSize="sm" color="gray.500">
							{translate('funds')}
						</Text>
						<Text fontSize="sm">${team.funds.toLocaleString('en-US')}</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize="sm" color="gray.500">
							{translate('members')}
						</Text>
						<Text fontSize="sm">{team.members}</Text>
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" py="1">
				<Button
					color={theme.branding.blue}
					bg="none"
					fontSize="xs"
					fontWeight="medium"
				>
					{translate('manage')}
				</Button>
			</Flex>
		</Flex>
	);
};

export default OrganizationCard;
