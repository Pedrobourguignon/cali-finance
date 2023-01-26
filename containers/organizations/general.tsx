import { Flex } from '@chakra-ui/react';
import { OrganizationsProvider } from 'contexts';
import { CompaniesLayoutNoConnected, OrganizationsConnected } from 'layouts';

export const OrganizationsContainer = () => {
	const isConnected = true;
	return (
		<OrganizationsProvider>
			<Flex>
				{isConnected ? (
					<OrganizationsConnected />
				) : (
					<CompaniesLayoutNoConnected />
				)}
			</Flex>
		</OrganizationsProvider>
	);
};
