import { Flex } from '@chakra-ui/react';
import { Sidebar } from 'components';
import { usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
	right: React.ReactNode;
}

export const AppLayout: React.FC<ILanding> = ({ children, right }) => {
	const theme = usePicasso();
	return (
		<Flex bg="black" py="6" w="100%">
			<Sidebar />
			<Flex
				bg="white"
				w="full"
				borderLeft="0.25rem solid"
				borderColor={theme.branding.blue}
				borderLeftRadius="sm"
				gap="4"
				justify="space-between"
				px="8"
			>
				<Flex direction="column" gap="4" pt="8" w="100%">
					{children}
				</Flex>
			</Flex>
			{right}
		</Flex>
	);
};
