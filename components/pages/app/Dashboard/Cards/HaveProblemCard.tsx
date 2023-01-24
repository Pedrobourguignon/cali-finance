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
				w="100%"
				px={{ md: '4', xl: '7' }}
				py={{ md: '4', xl: '6' }}
				borderRadius="base"
				bgImage="url(/images/haveproblem.png)"
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				cursor="pointer"
				onClick={onOpen}
			>
				<Flex direction="column">
					<Text
						fontSize={{ md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }}
						lineHeight="7"
						color="white"
						whiteSpace="nowrap"
					>
						{translate('haveAProblem')}
					</Text>
					<Text
						fontSize={{ md: 'sm', xl: 'md', '2xl': 'xl' }}
						lineHeight="6"
						color="white"
					>
						{translate('getInTouch')}
					</Text>
				</Flex>
			</Flex>
		</>
	);
};

export default HaveProblemCard;
