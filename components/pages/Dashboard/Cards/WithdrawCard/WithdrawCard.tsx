import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { WithdrawButton, WithdrawContent, TokenSelector } from 'components';
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
			<TokenSelector isOpen={isOpen} onClose={onClose} />
			<Flex w="100%" justify="space-between" align="center">
				<Text color={theme.text.black} fontWeight="semibold" fontSize="xl">
					$ Withdraw
				</Text>
			</Flex>
			<WithdrawContent onOpen={onOpen} />
			<WithdrawButton />
		</Flex>
	);
};
