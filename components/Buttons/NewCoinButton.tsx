import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

export const NewCoinButton = () => (
	<Flex align="center">
		<Button
			w="max-content"
			h="max-content"
			px="4"
			py="1"
			fontSize="sm"
			color="black"
			borderRadius="base"
			bg="white"
			_hover={{ background: 'white' }}
			_focus={{ background: 'white' }}
			_active={{
				background: 'white',
				transform: 'translateY(6px) translateX(5px)',
			}}
			fontWeight="medium"
			lineHeight="5"
		>
			+ New Coin
		</Button>
	</Flex>
);

export default NewCoinButton;
