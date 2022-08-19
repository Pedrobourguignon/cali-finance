import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const SearchFilter: React.FC = () => {
	const theme = usePicasso();
	const { t: trans } = useTranslation('common');

	return (
		<InputGroup w="48" h="9" color={theme.text.gray}>
			<Input
				type="text"
				placeholder={trans('teamTableFilter.search')}
				w="48"
				h="9"
				bg={theme.bg.bgCard}
				_placeholder={{ color: theme.text.gray }}
				border="none"
			/>
			<InputLeftElement h="full">
				<Icon as={AiOutlineSearch} />
			</InputLeftElement>
		</InputGroup>
	);
};
