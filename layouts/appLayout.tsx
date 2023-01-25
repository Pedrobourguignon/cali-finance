import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';
import { ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
	right?: React.ReactNode;
}

export const AppLayout: React.FC<ILanding> = ({ children, right }) => {
	const theme = usePicasso();
	return (
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
						px="6"
						gap="4"
						flexWrap={{ md: 'wrap', lg: 'nowrap' }}
					>
						<Flex direction="column" flex={{ md: '3', xl: '4' }}>
							{children}
						</Flex>
						<Flex py="6" flex={{ md: '3', xl: '2' }}>
							{right}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</ProfileProvider>
	);
};
