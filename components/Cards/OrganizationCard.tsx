import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { IOrganization } from 'types';
import { handleLogoImage } from 'utils';

export const OrganizationCard: React.FC<IOrganization> = ({
	logo,
	name,
	funds,
	members,
}) => {
	const theme = usePicasso();
	return (
		<Flex boxShadow="lg" bg="white" borderRadius="base">
			<Flex direction="column" px="1">
				<Flex align="center" gap="2.5" px="4" py="2.5">
					{logo ? (
						<Img src={logo} boxSize="6" borderRadius="base" />
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
							{handleLogoImage(logo, name)}
						</Flex>
					)}
					<Text fontSize="md" fontWeight="bold" color="black">
						{name}
					</Text>
				</Flex>
				<Flex gap="12" px="4">
					<Flex direction="column" color="black">
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

				<Button color={theme.branding.blue} bg="none" fontSize="xs">
					Manage
				</Button>
			</Flex>
		</Flex>
	);
};

export default OrganizationCard;
