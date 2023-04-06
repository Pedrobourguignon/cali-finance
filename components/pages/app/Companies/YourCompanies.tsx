import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const YourCompanies = () => {
	const { t: translate } = useTranslation('companies');
	const theme = usePicasso();

	return (
		<Flex direction="column" gap="4" w="full">
			<Text
				color={theme.text.primary}
				fontSize={{ md: 'sm', xl: 'md' }}
				fontWeight="medium"
			>
				{translate('yourCompanies')}
			</Text>
		</Flex>
	);
};
