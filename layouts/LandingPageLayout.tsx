import { Flex } from '@chakra-ui/react';
import { LandingHeader } from 'components';

import { usePicasso } from 'hooks';
import { IBackground } from 'types';

export const LandingLayout: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex direction="column" w="full" background={theme.bg.gradient}>
			<LandingHeader />
			{children}
		</Flex>
	);
};
