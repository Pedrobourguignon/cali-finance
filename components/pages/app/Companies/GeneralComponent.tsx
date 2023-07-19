import { Flex } from '@chakra-ui/react';
import { CompaniesConnected, CompaniesLayoutNoConnected } from 'layouts';
import {
	CompaniesConnectedMobile,
	CompaniesNoConnectedMobile,
} from 'components';

import React from 'react';
import { useAuth } from 'hooks';

export const GeneralComponent = () => {
	const { session } = useAuth();

	return (
		<>
			<Flex display={{ base: 'none', sm: 'flex' }}>
				{session ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
			</Flex>
			<Flex display={{ base: 'flex', sm: 'none' }}>
				{session ? (
					<CompaniesConnectedMobile />
				) : (
					<CompaniesNoConnectedMobile />
				)}
			</Flex>
		</>
	);
};

export default GeneralComponent;
