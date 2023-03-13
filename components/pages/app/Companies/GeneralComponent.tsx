import { Flex } from '@chakra-ui/react';
import { CompaniesProvider } from 'contexts';
import { CompaniesConnected, CompaniesLayoutNoConnected } from 'layouts';
import { useSession } from 'next-auth/react';
import React from 'react';

export const GeneralComponent = () => {
	const { data: session } = useSession();
	return (
		<CompaniesProvider>
			<Flex>
				{session ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
			</Flex>
		</CompaniesProvider>
	);
};

export default GeneralComponent;
