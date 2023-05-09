import { Flex } from '@chakra-ui/react';
import { FundsPageComponentMobile } from 'components';
import { CompaniesProvider, TokensProvider } from 'contexts';
import { MobileLayout } from 'layouts';

export const FundsContainerMobile = () => (
	<CompaniesProvider>
		<TokensProvider>
			<MobileLayout>
				<Flex
					borderTopRadius="3xl"
					top="79"
					w="100%"
					bg="white"
					position="absolute"
					h="17.3rem"
					zIndex="0"
					left="0"
				/>
				<FundsPageComponentMobile />
			</MobileLayout>
		</TokensProvider>
	</CompaniesProvider>
);
