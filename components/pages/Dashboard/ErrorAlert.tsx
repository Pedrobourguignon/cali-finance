import { Button, Flex, Img, Text, Link } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';

export const ErrorAlert = () => {
	const theme = usePicasso();
	return (
		<Flex align="center" h="max-content">
			<Flex>
				<Img src="/icons/error.svg" boxSize="96" />
			</Flex>
			<Flex direction="column" gap="7">
				<Text fontSize="6xl" fontWeight="bold" color={theme.text.primary}>
					Ops...
				</Text>
				<Text fontSize="4xl" color={theme.text.primary}>
					Something went wrong
				</Text>
				<Link href="/">
					<Button
						color="white"
						bg="black"
						fontSize="md"
						w="max-content"
						px="20"
					>
						Back to dashboard
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};
export default ErrorAlert;
