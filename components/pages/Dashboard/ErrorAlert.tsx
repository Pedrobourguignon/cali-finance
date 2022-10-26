import { Button, Flex, Img, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export const ErrorAlert = () => (
	<Flex align="center" h="max-content">
		<Flex>
			<Img src="/icons/error.svg" boxSize="96" />
		</Flex>
		<Flex direction="column" gap="7">
			<Text fontSize="6xl" fontWeight="bold">
				Ops...
			</Text>
			<Text fontSize="4xl">Something went wrong</Text>
			<Link href="/">
				<Button color="white" bg="black" fontSize="md" w="max-content" px="20">
					Back to dashboard
				</Button>
			</Link>
		</Flex>
	</Flex>
);

export default ErrorAlert;
