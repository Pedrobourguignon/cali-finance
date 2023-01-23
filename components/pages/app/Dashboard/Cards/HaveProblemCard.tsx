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
				justify="center"
				py="4"
				borderRadius="base"
				bgImage="url(/images/haveproblem.png)"
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				cursor="pointer"
				onClick={onOpen}
			>
				<Flex direction="column">
					<Text
						fontStyle="Medium"
						fontSize={{ lg: 'lg', xl: 'xl' }}
						lineHeight="7"
						color="white"
						whiteSpace="nowrap"
					>
						{translate('haveAProblem')}
					</Text>
					<Text
						fontStyle="Medium"
						fontSize={{ lg: 'sm', xl: 'md' }}
						lineHeight="6"
						color="white"
						whiteSpace="nowrap"
					>
						{translate('getInTouch')}
					</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default HaveProblemCard;
