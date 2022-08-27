import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Icon,
	Flex,
	Menu,
	MenuList,
	MenuItem,
	MenuButton,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import {
	IoChevronDownCircleOutline,
	IoChevronDownOutline,
} from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';
import { FiFilter } from 'react-icons/fi';
import { FC } from 'react';
import { SearchFilter } from './SearchFilter';

const groupOptions = ['Dev', 'Marketing', 'Business'];
const numberOfRowsOptions = [5, 10, 15];

interface IModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const FilterSandwichModal: FC<IModalProps> = props => {
	const { isOpen, onClose } = props;
	const theme = usePicasso();
	const { t: translate } = useTranslation('teams-page');

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="md">
			<ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
			<ModalContent
				w="100%"
				h="max-content"
				bgColor={theme.bg.primary}
				display="flex"
				flexDir="column"
				pb="8"
				m="auto"
				alignContent="center"
			>
				<ModalHeader display="flex" justifyContent="center">
					{translate('teamTableFilter.filter')}
				</ModalHeader>
				<ModalBody borderRadius="3xl" display="flex" flexDir="column">
					<Flex gap="4" direction="column" w="full">
						<Menu>
							<MenuButton
								as={Button}
								rightIcon={<IoChevronDownCircleOutline />}
								color={theme.text.gray}
								w="full"
								h="9"
								textAlign="start"
							>
								{translate('teamTableFilter.allGroups')}
							</MenuButton>
							<MenuList bg={theme.bg.card}>
								{groupOptions.map((group, index) => (
									<MenuItem key={+index}>{group}</MenuItem>
								))}
							</MenuList>
						</Menu>
						<SearchFilter />
						<Button
							w="full"
							bg={theme.bg.card}
							color={theme.text.gray}
							display="flex"
							gap="1"
							justifyContent="start"
						>
							<Icon as={FiFilter} zIndex="base" />
							{translate('teamTableFilter.filter')}
						</Button>
						<Menu>
							<MenuButton
								as={Button}
								rightIcon={<IoChevronDownOutline />}
								w="full"
								h="9"
								bg={theme.bg.card}
								color={theme.text.gray}
								textAlign="start"
							>
								{translate('teamTableFilter.rows')}
							</MenuButton>
							<MenuList bg={theme.bg.card}>
								{numberOfRowsOptions.map((option, index) => (
									<MenuItem key={+index}>{option}</MenuItem>
								))}
							</MenuList>
						</Menu>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default FilterSandwichModal;
