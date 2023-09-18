import { Flex } from '@chakra-ui/react';
import { FundsPageComponentMobile } from 'components';
import { MobileLayout } from 'layouts';

export const FundsContainerMobile = () => (
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
		<FundsPageComponentMobile />
	</MobileLayout>
);
