import { Flex, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components/OffsetShadow';
import { usePicasso } from 'hooks';

interface INetworkTooltip {
	children: React.ReactNode;
}

export const NetworkTooltip: React.FC<INetworkTooltip> = ({ children }) => {
	const theme = usePicasso();
	return (
		<OffsetShadow
			borderRadius="md"
			top="-4px"
			left="0.125rem"
			borderColor={theme.branding.blue}
			bg={theme.branding.blue}
		>
			<Flex
				bg="white"
				w="100%"
				h="max-content"
				borderWidth="1px"
				borderColor={theme.branding.blue}
				borderRadius="md"
				px="2"
				py="2"
				fontSize="sm"
			>
				<Text>{children}</Text>
			</Flex>
		</OffsetShadow>
	);
};
