import { Button, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const WithdrawButton = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');

	return (
		<Button
			w="100%"
			bg={theme.bg.primary}
			_hover={{}}
			h="max-content"
			py={{ lg: '1', xl: '1.5' }}
		>
			<Text fontSize="sm">{translate('withdraw')}</Text>
		</Button>
	);
};
