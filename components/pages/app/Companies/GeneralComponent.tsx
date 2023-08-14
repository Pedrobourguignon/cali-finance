import { Flex, useMediaQuery } from '@chakra-ui/react';
import { CompaniesConnected, CompaniesLayoutNoConnected } from 'layouts';
import {
	CompaniesConnectedMobile,
	CompaniesNoConnectedMobile,
} from 'components';

import React from 'react';
import { useAuth } from 'hooks';

export const GeneralComponent = () => {
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)');
	const { session } = useAuth();

	return isLargerThan767 ? (
		<Flex>
			{session ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
		</Flex>
	) : (
		<Flex>
			{session ? <CompaniesConnectedMobile /> : <CompaniesNoConnectedMobile />}
		</Flex>
	);
};

export default GeneralComponent;
