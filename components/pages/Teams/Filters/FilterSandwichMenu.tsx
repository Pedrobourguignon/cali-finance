import { Button, Flex, Icon, Img, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';
import { FilterSandwichModal } from './FilterSandwichModal';

export const FilterSandwichMenu = () => {
	const { onOpen, isOpen, onClose } = useDisclosure();

	return (
		<Flex direction="row" gap="6">
			<FilterSandwichModal isOpen={isOpen} onClose={onClose} />
			<Flex>
				<Button onClick={onOpen} bg="none">
					<Icon as={AiOutlineMenu} />
				</Button>
			</Flex>
		</Flex>
	);
};

export default FilterSandwichMenu;
