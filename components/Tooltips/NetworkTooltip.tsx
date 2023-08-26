import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

interface INetworkTooltip {
	children: React.ReactNode;
}

export const NetworkTooltip: React.FC<INetworkTooltip> = ({ children }) => {
	const theme = usePicasso();
	return (
		<Flex position="relative" borderRadius="md" width="max-content">
			<Flex
				bg={theme.branding.blue2}
				zIndex="0"
				border="1px solid"
				borderColor={theme.branding.blue2}
				borderRadius="inherit"
				w="100%"
				px="0"
				py="0"
			>
				<Flex
					position="relative"
					right="0.5"
					top="1"
					bg="white"
					w="100%"
					h="max-content"
					borderWidth="1px"
					borderColor={theme.branding.blue2}
					borderRadius="md"
					px="2"
					py="2"
					fontSize="sm"
				>
					<Text>{children}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};
