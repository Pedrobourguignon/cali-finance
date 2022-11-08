import { Button, Img } from '@chakra-ui/react';
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
		w="40"
		fontSize="sm"
		variant="outline"
		fontWeight="500"
		py="1.5"
		bg="transparent"
		borderRadius="base"
		borderColor="gray.800"
		onClick={onClick}
		_hover={{ bg: 'transparent' }}
		_focus={{ bg: 'transparent' }}
		gap="2"
	>
		<Img src={networkIcon} bg="transparent" boxSize="6" />
		{networkName}
	</Button>
);

export default ChangeNetworkButton;
