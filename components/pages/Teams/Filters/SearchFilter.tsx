import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { usePicasso } from 'hooks';

export const SearchFilter: React.FC = () => {
	const theme = usePicasso();
	return (
		<InputGroup w="48" h="9" color={theme.text.gray}>
			<Input
				type="text"
				placeholder="Search someone..."
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
