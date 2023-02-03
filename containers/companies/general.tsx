import { Flex } from '@chakra-ui/react';
import { CompaniesProvider } from 'contexts';
import { CompaniesLayoutNoConnected, CompaniesConnected } from 'layouts';

export const CompaniesContainer = () => {
	const isConnected = false;
	return (
		<CompaniesProvider>
			<Flex>
				{isConnected ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
			</Flex>
		</CompaniesProvider>
	);
};
