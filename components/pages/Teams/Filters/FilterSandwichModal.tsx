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
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { IoChevronDownOutline } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';
import { FiFilter } from 'react-icons/fi';
import { SearchFilter } from './SearchFilter';

interface IModal {
	isOpen: boolean;
	onClose: () => void;
}

export const FilterSandwichModal = (props: IModal) => {
	const { isOpen, onClose } = props;
	const theme = usePicasso();
	const { t: translate } = useTranslation('common');

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
			<ModalContent
				w="60"
				h="80"
				bgColor={theme.bg.primary}
				display="flex"
				flexDir="column"
				m="auto"
				alignContent="center"
			>
				<ModalHeader display="flex" justifyContent="center">
					Filters
				</ModalHeader>
				<ModalBody borderRadius="14" display="flex" flexDir="column">
					<Flex gap="4" direction="column" align="flex-start">
						<Flex>
							<Menu>
								<Button
									rightIcon={<IoChevronDownOutline />}
									minW="48"
									minH="9"
									bg={theme.bg.bgCard}
									color={theme.text.gray}
								>
									{translate('teamTableFilter.allGroups')}
								</Button>
								<MenuList bg="none">
									<MenuItem>Download</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
						<Flex>
							<SearchFilter />
						</Flex>
						<Flex>
							<Button w="48" bg={theme.bg.bgCard} color={theme.text.gray}>
								<Icon as={FiFilter} mr="1" />
								{translate('teamTableFilter.filter')}
							</Button>
						</Flex>
						<Flex>
							<Menu>
								<Button
									as={Button}
									rightIcon={<IoChevronDownOutline />}
									w="48"
									h="9"
									bg={theme.bg.bgCard}
									color={theme.text.gray}
								>
									{translate('teamTableFilter.rows')}
								</Button>
								<MenuList bg="none">
									<MenuItem>Teste</MenuItem>
								</MenuList>
							</Menu>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default FilterSandwichModal;
