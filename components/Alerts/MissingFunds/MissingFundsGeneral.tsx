import { Flex, Img, Text } from '@chakra-ui/react';
import { useCompanies } from 'hooks';
import React from 'react';
import { MultipleCompaniesAlert, SingleCompanieAlert } from 'components';

export const MissingFundsWarning = () => {
	const {
		setDisplayMissingFundsWarning,
		displayMissingFundsWarning,
		companiesWithMissingFunds,
	} = useCompanies();
	const missingValue = 23121423;

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
				{companiesWithMissingFunds.length > 1 ? (
					<MultipleCompaniesAlert />
				) : (
					<SingleCompanieAlert missingValue={missingValue} />
				)}
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
