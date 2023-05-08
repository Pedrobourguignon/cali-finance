import { OverviewComponentMobile } from 'components';
import { MobileLayout } from 'layouts';
import { CompaniesProvider, ProfileProvider, TokensProvider } from 'contexts';
import { Flex } from '@chakra-ui/react';

export const OverviewTabMobile = () => (
	<TokensProvider>
		<ProfileProvider>
			<CompaniesProvider>
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
					<OverviewComponentMobile />
				</MobileLayout>
			</CompaniesProvider>
		</ProfileProvider>
	</TokensProvider>
);