import { Flex } from '@chakra-ui/react';
import { AppHeader, Sidebar } from 'components';
import { usePicasso } from 'hooks/usePicasso';
import { IBackground } from 'types';

export const AppLayout: React.FC<IBackground> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex
			direction="column"
			w="full"
			background={theme.bg.secondary}
			minHeight="100vh"
		>
			<Flex as="header">
				<AppHeader />
			</Flex>
			<Flex position="fixed">
				<Sidebar />
			</Flex>
			<Flex pl="40" pt="16">
				{children}
			</Flex>
		</Flex>
	);
};
