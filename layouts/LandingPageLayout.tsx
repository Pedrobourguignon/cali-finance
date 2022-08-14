import { Flex } from '@chakra-ui/react';
import { LandingHeader } from 'components';

import { usePicasso } from 'hooks';
import { IBackground } from 'types';

export const LandingLayout: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex minH="100vh" w="full" h="100vh">
			<Flex
				zIndex="hide"
				position="absolute"
				background={theme.bg.gradient}
				w="full"
				h="full"
				opacity="0.6"
			/>
			<Flex
				zIndex="ultrahide"
				position="absolute"
				bgColor={theme.bg.landing}
				w="full"
				h="full"
			/>
			<Flex w="full" h="full" direction="column" zIndex="base">
				<LandingHeader />
				{children}
			</Flex>
		</Flex>
	);
};
