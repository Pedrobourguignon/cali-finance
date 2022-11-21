import { Button, Flex, Img, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

export const ErrorAlert = () => {
	const { t: translate } = useTranslation('dashboard');
	return (
		<Flex align="center" h="max-content">
			<Flex>
				<Img src="/icons/error.svg" boxSize="96" />
			</Flex>
			<Flex direction="column" gap="7">
				<Text fontSize="6xl" fontWeight="bold">
					{translate('ops')}
				</Text>
				<Text fontSize="4xl">{translate('somethingWentWrong')}</Text>
				<Link href="/">
					<Button
						color="white"
						bg="black"
						fontSize="md"
						w="max-content"
						px="20"
					>
						{translate('backDashboard')}
					</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default ErrorAlert;
