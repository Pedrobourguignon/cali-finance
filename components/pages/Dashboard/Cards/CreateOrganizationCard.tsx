import { Button, Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';

export const CreateOrganizationCard = () => (
	<Flex
		w="56"
		h="32"
		mt="4"
		ml="8"
		gap="6"
		boxShadow="2xl"
		direction="column"
		justify="center"
		align="center"
		borderRadius="base"
	>
		<Flex align="center" justify="center" gap="5" w="44">
			<Img src="/icons/avatar.svg" boxSize="8" />
			<Text fontStyle="normal">You don’t have a Organization yet</Text>
		</Flex>
		<Button
			color="white"
			bg="black"
			w="48"
			h="8"
			fontSize="sm"
			fontWeight="500"
			lineHeight="5"
			borderRadius="sm"
			_hover={{ bg: 'black' }}
		>
			+ Create a Organization
		</Button>
	</Flex>
);

export default CreateOrganizationCard;
