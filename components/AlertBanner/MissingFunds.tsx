import { Flex, Img, Text } from '@chakra-ui/react';
import { useCompanies, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface IMissingFunds {
	display: string;
}

export const MissingFundsWarning: React.FC<IMissingFunds> = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('alerts');
	const {
		companies,
		setDisplayMissingFundsWarning,
		displayMissingFundsWarning,
	} = useCompanies();
	const missingValue = 23121423;

	return (
		<Flex
			bg={theme.bg.missingFunds}
			py="1.5"
			justify="center"
			align="center"
			display={displayMissingFundsWarning}
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
					{translate('yourCompanieIsMissing', { companie: companies[0].name })}
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					fontWeight="semibold"
					whiteSpace="nowrap"
				>
					&nbsp;{translate('deposit')}&nbsp;
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm' }}
					color={theme.bg.primary}
					whiteSpace="nowrap"
				>
					{translate('atLeast', {
						value: missingValue.toLocaleString('en-US'),
					})}
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
