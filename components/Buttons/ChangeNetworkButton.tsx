import { Button, Img, Text } from '@chakra-ui/react';
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
	<Button
		fontSize="sm"
		variant="outline"
		fontWeight="500"
		py="1.5"
		px="4"
		bg="transparent"
		borderRadius="base"
		borderColor="gray.800"
		onClick={onClick}
		_hover={{ bg: 'transparent' }}
		_focus={{ bg: 'transparent' }}
		gap="2"
		w={{ md: '8rem', xl: '9rem' }}
	>
		<Img src={networkIcon} bg="transparent" boxSize="6" />
		<Text display={{ base: 'none', lg: 'flex' }}>{networkName}</Text>
	</Button>
);

export default ChangeNetworkButton;
