import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';
import { AuthProvider, ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
}

export const EditProfileLayout: React.FC<ILanding> = ({ children }) => {
	const theme = usePicasso();
	return (
		<AuthProvider>
			<ProfileProvider>
				<Flex bg={theme.bg.primary} py="6" minH="100vh" w="full">
					<Sidebar />
					<Flex
						bg="white"
						w="full"
						borderLeft="0.25rem solid"
						borderColor={theme.branding.blue}
						borderLeftRadius="sm"
						position="relative"
					>
						<Flex
							bg={theme.bg.gray2}
							w="full"
							bgImage="/images/calipattern.png"
							bgRepeat="no-repeat"
							bgPosition="right bottom"
							position="relative"
							flexWrap={{ md: 'wrap', lg: 'nowrap' }}
						>
							<Flex direction="column" w="full" h="full">
								{children}
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</ProfileProvider>
		</AuthProvider>
	);
};
