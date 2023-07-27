import { Flex, Text, Icon } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { socialMediaLinks } from 'utils';

export const GetInTouchFooterCardMobile = () => {
	const { t: translate } = useTranslation('landing');
	return (
		<Flex
			position="relative"
			top="32"
			zIndex="1"
			w={{ md: '35rem', lg: '51rem' }}
			h="7.7rem"
			borderRadius="base"
			bgGradient="linear(to-r, #1A94E1, #09CFD6)"
		>
			<Flex
				justify="center"
				direction="column"
				align="center"
				boxSize="inherit"
				gap="2"
			>
				<Text
					fontSize={{ base: '2xl', md: 'xl', lg: '3xl' }}
					fontWeight="bold"
					px="6"
					textAlign="center"
				>
					{translate('weAreHere')}
				</Text>
				<Flex
					cursor="pointer"
					align="center"
					gap="3"
					onClick={() => window.open(socialMediaLinks.discord)}
				>
					<Text fontWeight="medium" as="u">
						{translate('getInTouch')}
					</Text>
					<Icon as={BsArrowUpRight} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default GetInTouchFooterCardMobile;
