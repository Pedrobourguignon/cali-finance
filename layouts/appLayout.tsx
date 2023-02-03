import { Flex } from '@chakra-ui/react';
import { MissingFundsWarning, Sidebar } from 'components';
import { CompaniesProvider, ProfileProvider } from 'contexts';
import { useCompanies, usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
	right?: React.ReactNode;
}

export const AppLayout: React.FC<ILanding> = ({ children, right }) => {
	const theme = usePicasso();
	const { displayMissingFundsWarning } = useCompanies();
	return (
		<ProfileProvider>
			<CompaniesProvider>
				<Flex minH="100vh" w="full" direction="column">
					<MissingFundsWarning display={displayMissingFundsWarning} />
					<Flex bg={theme.bg.primary} py="6" minH="100vh" w="full">
						<Sidebar />
						<Flex
							bg="white"
							w="full"
							borderLeft="0.25rem solid"
							borderColor={theme.branding.blue}
							borderLeftRadius="sm"
							position="relative"
							flex="7"
						>
							<Flex
								bg={theme.bg.gray2}
								w="full"
								bgImage="/images/calipattern.png"
								bgRepeat="no-repeat"
								bgPosition="right bottom"
								position="relative"
								px="6"
								gap="4"
								flexWrap={{ md: 'wrap', lg: 'nowrap' }}
							>
								<Flex direction="column" flex="7">
									{children}
								</Flex>
								<Flex py="6" flex="3">
									{right}
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</CompaniesProvider>
		</ProfileProvider>
	);
};
