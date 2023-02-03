/* eslint-disable no-unused-expressions */
import { Flex, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import React, { useState } from 'react';

interface IMissingFunds {
	display: string;
}

export const MissingFundsWarning: React.FC<IMissingFunds> = ({ display }) => {
	const theme = usePicasso();
	const { companies, setDisplayMissingFundsWarning } = useCompanies();
	const missingValue = 23121423;

	return (
		<Flex
			bg={theme.bg.missingFunds}
			py="1.5"
			justify="center"
			align="center"
			display={display}
			w="full"
		>
			<Flex w="full" justify="center">
				<Img src="/images/alert.png" boxSize="5" />
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					pl="2.5"
					whiteSpace="nowrap"
				>
					Your company {companies[0].name} is missing needed funds.
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					fontWeight="semibold"
					whiteSpace="nowrap"
				>
					&nbsp;Deposit&nbsp;
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					whiteSpace="nowrap"
				>
					at least ${missingValue.toLocaleString('en-US')} at the company’s
					funds tab.
				</Text>
			</Flex>

			<Text
				color={theme.text.gray700}
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
