import { Button, Img, Text } from '@chakra-ui/react';
import React from 'react';

interface IChangeNetworkMobile {
	networkName: string;
	networkIcon: string;
	onClick: () => void;
}

export const ChangeNetworkMobile: React.FC<IChangeNetworkMobile> = ({
	networkIcon,
	networkName,
	onClick,
}) => (
	<Button
		maxW="8"
		maxH="8"
		fontSize="sm"
		variant="outline"
		fontWeight="medium"
		bg="transparent"
		borderRadius="base"
		borderColor="gray.800"
		onClick={onClick}
		_hover={{ bg: 'transparent' }}
		_focus={{ bg: 'transparent' }}
		p="0"
	>
		<Img src={networkIcon} bg="transparent" boxSize="6" />
		<Text display={{ base: 'none', lg: 'flex' }}>{networkName}</Text>
	</Button>
);

export default ChangeNetworkMobile;
