import { Flex } from '@chakra-ui/react';
import { CompaniesConnected, CompaniesLayoutNoConnected } from 'layouts';
import { useSession } from 'next-auth/react';
import React from 'react';

export const GeneralComponent = () => {
	const { data: session } = useSession();
	return (
		<Flex>
			{session ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
		</Flex>
	);
};

export default GeneralComponent;
