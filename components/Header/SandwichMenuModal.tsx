import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Icon,
	Flex,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { BsArrowLeftRight } from 'react-icons/bs';
import { MdPeopleAlt } from 'react-icons/md';
import { RiHome3Line } from 'react-icons/ri';
import { IconType } from 'react-icons';

interface IModal {
	isOpen: boolean;
	onClose: () => void;
}

interface IMenuItem {
	route: string;
	option: string;
	icon: IconType;
}

const menuOptions: IMenuItem[] = [
	{
		route: '/app',
		option: 'Home',
		icon: RiHome3Line,
	},
	{
		route: '/app/teams',
		option: 'Teams',
		icon: MdPeopleAlt,
	},
	{
		route: '/app/swap',
		option: 'Swap',
		icon: BsArrowLeftRight,
	},
];

export const SandwichMenuModal = (props: IModal) => {
	const { isOpen, onClose } = props;
	const theme = usePicasso();

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
			<ModalContent
				w="60"
				h="60"
				bgColor={theme.bg.primary}
				display="flex"
				flexDir="column"
				m="auto"
				alignContent="center"
			>
				<ModalHeader display="flex" justifyContent="center">
					Pages
				</ModalHeader>
				<ModalBody borderRadius="14" display="flex" flexDir="column">
					{menuOptions.map((item, index) => (
						<Flex
							key={+index}
							direction="row"
							alignItems="center"
							justify="flex-start"
							gap="6"
							my="1"
						>
							<Icon as={item.icon} boxSize="6" borderRadius="full" />
							<Button bg="none" fontWeight="400" fontSize="2xl">
								{item.option}
							</Button>
						</Flex>
					))}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SandwichMenuModal;
