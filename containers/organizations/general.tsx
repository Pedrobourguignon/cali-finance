import { Flex } from '@chakra-ui/react';
import { OrganizationsProvider } from 'contexts';
import {
	OrganizationsConnected,
	OrganizationsLayoutNoConnected,
} from 'layouts';

export const OrganizationsContainer = () => {
	const isConnected = true;
	return (
		<OrganizationsProvider>
			<Flex>
				{isConnected ? (
					<OrganizationsConnected />
				) : (
					<OrganizationsLayoutNoConnected />
				)}
			</Flex>
		</OrganizationsProvider>
	);
};
