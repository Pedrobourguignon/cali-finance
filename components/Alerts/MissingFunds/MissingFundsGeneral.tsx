import { Flex, Img, Text } from '@chakra-ui/react';
import { useCompanies } from 'hooks';
import React from 'react';

export const MissingFundsWarning: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { displayMissingFundsWarning, setDisplayMissingFundsWarning } =
		useCompanies();

	return (
		<Flex
			bg="red.100"
			py="1.5"
			justify="center"
			align="center"
			display={displayMissingFundsWarning}
			w="full"
		>
			<Flex w="full" justify="center">
				<Img src="/images/alert.png" boxSize="5" />
				{children}
			</Flex>
			<Text
				color="gray.700"
				cursor="pointer"
				fontSize="xs"
				onClick={() => setDisplayMissingFundsWarning('none')}
				pr="8"
			>
				X
			</Text>
		</Flex>
	);
};

export default MissingFundsWarning;
