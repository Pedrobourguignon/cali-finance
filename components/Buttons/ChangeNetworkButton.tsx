import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface IChangeNetworkButton {
	networkName: string;
	networkIcon: IconType | typeof Icon;
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
		<Icon as={networkIcon} color="white" bg="transparent" />
		{networkName}
	</Button>
);

export default ChangeNetworkButton;
