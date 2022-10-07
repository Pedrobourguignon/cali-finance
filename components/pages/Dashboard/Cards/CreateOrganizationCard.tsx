import { Button, Flex, Img, Text, Icon } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const CreateOrganizationCard = () => (
	<Flex
		w="max-content"
		h="max-content"
		boxShadow="2xl"
		direction="column"
		justify="center"
		align="center"
		borderRadius="base"
	>
		<Flex align="center" justify="center" gap="5" py="4">
			<Img src="/icons/avatar.svg" boxSize="8" />
			<Flex direction="column">
				<Text fontStyle="normal">You don’t have</Text>
				<Text fontStyle="normal">a Organization yet</Text>
			</Flex>
		</Flex>
		<Flex px="4" py="2">
			<Button
				color="white"
				bg="black"
				px="2"
				fontSize="sm"
				fontWeight="medium"
				borderRadius="sm"
				_hover={{ bg: 'black' }}
				gap="2"
			>
				<Icon as={AiOutlinePlus} />
				Create a Organization
			</Button>
		</Flex>
	</Flex>
);

export default CreateOrganizationCard;
