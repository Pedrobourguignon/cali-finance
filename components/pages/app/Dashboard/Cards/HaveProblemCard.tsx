import { Flex, Img, Text, useDisclosure } from '@chakra-ui/react';
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
				px="7"
				py="6"
				borderRadius="base"
				bgImage="url(/images/haveproblem.png)"
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				cursor="pointer"
				onClick={onOpen}
				position="relative"
			>
				<Flex direction="column" zIndex="docked">
					<Text
						fontSize={{ lg: 'md', xl: 'xl' }}
						lineHeight="7"
						color="white"
						whiteSpace="nowrap"
					>
						{translate('haveAProblem')}
					</Text>
					<Text fontSize={{ lg: 'sm', xl: 'md' }} lineHeight="6" color="white">
						{translate('getInTouch')}
					</Text>
				</Flex>
				<Img
					src="/images/cali-background-texture.png"
					position="absolute"
					top="0"
					left="0"
					w="100%"
					h="100%"
				/>
			</Flex>
		</>
	);
};

export default HaveProblemCard;
