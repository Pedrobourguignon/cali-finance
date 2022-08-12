import { Flex, Icon, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { AiOutlinePlus } from 'react-icons/ai';

export const NewCoinCard = () => {
	const theme = usePicasso();
	return (
		<Flex
			w="56"
			h="24"
			px="4"
			bg={theme.bg.primary}
			rounded="lg"
			align="center"
			ml="4"
		>
			<Flex
				w="12"
				h="12"
				borderStyle="solid"
				borderWidth="0.063rem"
				borderRadius="md"
				borderColor={theme.text.gray}
				align="center"
				justify="center"
			>
				<Icon as={AiOutlinePlus} color={theme.text.gray} boxSize="8" />
			</Flex>
			<Text ml="3" color={theme.text.gray} fontSize="sm">
				Add a new coin...
			</Text>
		</Flex>
	);
};
