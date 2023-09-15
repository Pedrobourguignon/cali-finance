import { OverviewComponentMobile } from 'components';
import { MobileLayout } from 'layouts';
import { Flex } from '@chakra-ui/react';

export const OverviewTabMobile = () => (
	<MobileLayout>
		<Flex
			borderTopRadius="3xl"
			top="79"
			w="100%"
			bg="white"
			position="absolute"
			h="18rem"
			zIndex="0"
			left="0"
		/>
		<OverviewComponentMobile />
	</MobileLayout>
);
