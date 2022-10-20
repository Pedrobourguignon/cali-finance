import { Flex } from '@chakra-ui/react';
import { HaveProblemCard, Sidebar, SwapToken } from 'components';
import { usePicasso } from 'hooks';

interface ILanding {
	children: React.ReactNode;
}

export const AppLayout: React.FC<ILanding> = ({ children }) => {
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
			<Flex direction="column" gap="4" w="74" bg="white" py="6" px="6">
				<SwapToken />
				<HaveProblemCard />
			</Flex>
		</Flex>
	);
};
