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
		<Flex bg={theme.bg.primary} py="6" w="100%">
			<Sidebar />
			<Flex
				bg="white"
				w="full"
				borderLeft="0.25rem solid"
				borderColor={theme.branding.blue}
				borderLeftRadius="sm"
				gap="4"
				justify="space-between"
				position="relative"
			>
				<Flex
					bg={theme.bg.gray2}
					w="full"
					h="100%"
					bgImage="/images/calipattern.png"
					bgRepeat="no-repeat"
					bgPosition="right bottom"
					position="relative"
				>
					<Flex direction="column" w="100%">
						{children}
					</Flex>
					{right}
				</Flex>
			</Flex>
		</Flex>
	);
};
