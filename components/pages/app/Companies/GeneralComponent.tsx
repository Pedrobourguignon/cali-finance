import { Flex } from '@chakra-ui/react';
import { CompaniesProvider } from 'contexts';
import { CompaniesConnected, CompaniesLayoutNoConnected } from 'layouts';
import {
	CompaniesConnectedMobile,
	CompaniesNoConnectedMobile,
} from 'components';
import { useSession } from 'next-auth/react';
import React from 'react';

export const GeneralComponent = () => {
	const { data: session } = useSession();

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
