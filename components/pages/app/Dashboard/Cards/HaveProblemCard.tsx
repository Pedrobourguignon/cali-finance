import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ContactOptionsModal } from 'components';

export const HaveProblemCard = () => {
	const { t: translate } = useTranslation('have-a-problem');
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<ContactOptionsModal isOpen={isOpen} onClose={onClose} />
			<Flex
				w="full"
				px="12"
				py="6"
				borderRadius="base"
				bgImage="url(/images/haveproblem.png)"
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				cursor="pointer"
				onClick={onOpen}
			>
				<Flex direction="column">
					<Text fontStyle="Medium" fontSize="xl" lineHeight="7" color="white">
						{translate('haveAProblem')}
					</Text>
					<Text fontStyle="Medium" fontSize="md" lineHeight="6" color="white">
						{translate('getInTouch')}
					</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default HaveProblemCard;
