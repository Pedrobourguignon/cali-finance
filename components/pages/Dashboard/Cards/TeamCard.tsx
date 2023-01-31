import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { CompanyCardIcon } from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

interface ITeamCard {
	name: string;
	funds: string;
	members: number;
}

export const TeamCard: React.FC<ITeamCard> = ({ name, funds, members }) => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex boxShadow="lg" justify="center" bg="white" mr="2">
			<Flex direction="column">
				<Flex align="center" gap="2.5" py="2.5">
					<Icon as={CompanyCardIcon} boxSize="6" color="black" />
					<Text fontSize="md" fontWeight="bold" color="#121212">
						{name}
					</Text>
				</Flex>
				<Flex gap="14" w="full">
					<Flex direction="column" color="#121212">
						<Text fontSize="sm" color="gray.500">
							{translate('funds')}
						</Text>
						{funds}
					</Flex>
					<Flex direction="column" color="black">
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
