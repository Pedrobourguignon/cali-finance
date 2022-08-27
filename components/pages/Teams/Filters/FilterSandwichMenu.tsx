import { Button, Flex, Icon, Img, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Router from 'next/router';
import { BsFilter } from 'react-icons/bs';
import { FilterSandwichModal } from './FilterSandwichModal';

export const FilterSandwichMenu = () => {
	const { onOpen, isOpen, onClose } = useDisclosure();

	return (
		<>
			<FilterSandwichModal isOpen={isOpen} onClose={onClose} />
			<Flex direction="row" gap="6" w="full">
				<Flex w="full" align="center" justify="center">
					<Button onClick={onOpen} bg="none" w="full">
						<Icon as={BsFilter} w="8" h="8" />
					</Button>
				</Flex>
			</Flex>
		</>
	);
};

export default FilterSandwichMenu;
