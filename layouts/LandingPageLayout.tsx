import { Flex } from '@chakra-ui/react';
import { LandingHeader } from 'components';

import { usePicasso } from 'hooks';
import { IBackground } from 'types';

export const LandingLayout: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex
			minH="100vh"
			direction="column"
			w="full"
			justifyContent={['space-between', 'center']}
			background={theme.bg.gradient}
		>
			<LandingHeader />
			{children}
		</Flex>
	);
};
