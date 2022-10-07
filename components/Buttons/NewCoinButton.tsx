import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const NewCoinButton = () => (
	<Button
		w="max-content"
		h="max-content"
		px="2"
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
		gap="2"
	>
		<Icon as={AiOutlinePlus} />
		New Coin
	</Button>
);

export default NewCoinButton;
