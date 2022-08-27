import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const SearchFilter: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');

	return (
		<InputGroup w="full" h="9" color={theme.text.gray}>
			<Input
				type="text"
				placeholder={translate('teamTableFilter.search')}
				h="9"
				bg={theme.bg.card}
				_placeholder={{ color: theme.text.gray }}
				border="none"
			/>
			<InputLeftElement h="full" zIndex="base">
				<Icon as={AiOutlineSearch} />
			</InputLeftElement>
		</InputGroup>
	);
};
