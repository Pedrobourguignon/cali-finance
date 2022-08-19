import { Button, Flex, Icon, Img, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';
import { SandwichMenuModal } from './SandwichMenuModal';

export const SandwichMenu = () => {
	const { onOpen, isOpen, onClose } = useDisclosure();
	const closeModal = () => {
		onClose();
		Router.push('/app/teams');
	};

	return (
		<Flex direction="row" gap="6">
			<SandwichMenuModal isOpen={isOpen} onClose={closeModal} />
			<Flex alignItems="center">
				<Link href="/">
					<Img
						src="/images/cali-logo.svg"
						minW="16"
						minH="10"
						cursor="pointer"
					/>
				</Link>
			</Flex>
			<Flex>
				<Button onClick={onOpen}>
					<Icon as={AiOutlineMenu} />
				</Button>
			</Flex>
		</Flex>
	);
};

export default SandwichMenu;
