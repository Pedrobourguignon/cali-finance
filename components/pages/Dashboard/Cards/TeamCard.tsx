import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface ITeamCard {
	teamName: string;
	funds: string;
	members: number;
}

export const TeamCard: React.FC<ITeamCard> = ({ teamName, funds, members }) => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex boxShadow="lg">
			<Flex direction="column" px="1">
				<Flex align="center" gap="2.5" px="4" py="2.5">
					<Img src="/icons/organizations.svg" boxSize="6" />
					<Text fontSize="md" fontWeight="bold">
						{teamName}
					</Text>
				</Flex>
				<Flex gap="12" px="4">
					<Flex direction="column">
						<Text fontSize="sm" color="gray.500">
							{translate('funds')}
						</Text>
						{funds}
					</Flex>
					<Flex direction="column">
						<Text fontSize="sm" color="gray.500">
							{translate('members')}
						</Text>
						{members}
					</Flex>
				</Flex>

				<Button color={theme.branding.blue} bg="none" fontSize="xs">
					{translate('manage')}
				</Button>
			</Flex>
		</Flex>
	);
};

export default TeamCard;
