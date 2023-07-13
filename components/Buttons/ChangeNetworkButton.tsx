import { Button, Flex, Img, Text } from '@chakra-ui/react';
import React from 'react';

interface IChangeNetworkButton {
	networkName: string;
	networkIcon: string;
	onClick: () => void;
}

export const ChangeNetworkButton: React.FC<IChangeNetworkButton> = ({
	networkIcon,
	networkName,
	onClick,
}) => (
	<Flex
		fontSize="sm"
		border="1px solid"
		fontWeight="medium"
		h="max-content"
		py="1.5"
		px="4"
		bg="transparent"
		justify="center"
		align="center"
		borderRadius="base"
		borderColor="gray.800"
		onClick={onClick}
		// _hover={{ bg: 'transparent' }}
		// _focus={{ bg: 'transparent' }}
		gap={{ base: '0', sm: '2' }}
		w={{ md: '8.25rem', xl: '10.313rem', '2xl': 52 }}
		maxH="2rem"
	>
		<Img src={networkIcon} bg="transparent" boxSize="4" />
		<Text display={{ base: 'none', lg: 'flex' }}>{networkName}</Text>
	</Flex>
);

export default ChangeNetworkButton;
