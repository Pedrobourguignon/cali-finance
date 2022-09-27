import { Flex, Text } from '@chakra-ui/react';
import { DashboardHeader } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const DashboardComponent: React.FC = () => {
	const banana = 123;
	const theme = usePicasso();

	return (
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="8px solid"
			borderColor={theme.branding.blue}
		>
			<Flex>
				<DashboardHeader />
			</Flex>
		</Flex>
	);
};

export default DashboardComponent;
