import { Button, Flex, Img, Text, Icon } from '@chakra-ui/react';
import { OrganizationIcon } from 'components/Icons';
import { usePicasso } from 'hooks';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const CreateOrganizationCard = () => {
	const theme = usePicasso();

	return (
		<Flex
			w="max-content"
			h="max-content"
			boxShadow="2xl"
			direction="column"
			justify="center"
			align="center"
			borderRadius="base"
			maxW="56"
			px="6"
			py="4"
			gap="4"
		>
			<Flex
				align="center"
				justify="space-between"
				gap="5"
				color={theme.text.mono}
			>
				<Icon as={OrganizationIcon} boxSize="8" color={theme.text.mono} />
				<Flex direction="column">
					<Text fontStyle="normal" fontWeight="medium" color={theme.text.mono}>
						You don’t have a Organization yet
					</Text>
				</Flex>
			</Flex>
			<Button
				color="white"
				bg="black"
				fontSize="sm"
				fontWeight="medium"
				borderRadius="sm"
				_hover={{ bg: 'black' }}
				gap="2"
				w="min-content"
			>
				<Icon as={AiOutlinePlus} />
				Create a Organization
			</Button>
		</Flex>
	);
};

export default CreateOrganizationCard;
