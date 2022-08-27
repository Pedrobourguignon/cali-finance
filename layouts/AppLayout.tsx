import { Flex } from '@chakra-ui/react';
import { AppHeader, Sidebar } from 'components';
import { ProfileProvider } from 'contexts';
import { usePicasso } from 'hooks/usePicasso';

interface IAppLayout {
	children: React.ReactNode;
}

export const AppLayout: React.FC<IAppLayout> = ({ children }) => {
	const theme = usePicasso();
	return (
		<ProfileProvider>
			<Flex
				direction="column"
				background={theme.bg.secondary}
				minH="100vh"
				position="relative"
				overflow="hidden"
			>
				<Flex
					zIndex="hide"
					position="absolute"
					background={theme.bg.gradient}
					w="full"
					h="full"
					opacity="0.6"
				/>
				<Flex as="header" w="full" h="full" direction="column" zIndex="base">
					<AppHeader />
				</Flex>
				<Flex position="fixed">
					<Sidebar />
				</Flex>
				<Flex
					ml={{ base: '0', lg: '40' }}
					justify={{ base: 'center', lg: 'flex-start' }}
				>
					{children}
				</Flex>
			</Flex>
		</ProfileProvider>
	);
};
