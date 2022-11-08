import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { WithdrawButton, WithdrawContent } from 'components';
import { usePicasso } from 'hooks';

export const WithdrawCard = () => {
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			bg="white"
			direction="column"
			p="6"
			gap="6"
			borderRadius="base"
			borderWidth="0.1rem"
			borderColor={theme.bg.primary}
		>
			<Flex w="100%" justify="space-between" align="center">
				<Text color={theme.text.black} fontWeight="semibold" fontSize="xl">
					$ Withdraw
				</Text>
			</Flex>
			<WithdrawContent />
			<WithdrawButton />
		</Flex>
	);
};
