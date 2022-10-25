import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import {
	OrganizationsConnected,
	OrganizationsLayoutNoConnected,
} from 'layouts';

export const OrganizationsContainer = () => {
	const theme = usePicasso();
	const isConnected = true;
	return (
		<Flex>
			{isConnected ? (
				<OrganizationsConnected />
			) : (
				<OrganizationsLayoutNoConnected />
			)}
		</Flex>
	);
};
