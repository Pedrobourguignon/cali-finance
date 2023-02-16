import { Flex } from '@chakra-ui/react';
import { useProfile } from 'hooks';
import { CompaniesConnected, CompaniesLayoutNoConnected } from 'layouts';
import React from 'react';

export const GeneralComponent = () => {
	const { isConnected } = useProfile();
	return (
		<Flex>
			{isConnected ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
		</Flex>
	);
};

export default GeneralComponent;
