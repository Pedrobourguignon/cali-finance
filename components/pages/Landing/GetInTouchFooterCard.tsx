import { Flex, Text, Icon } from '@chakra-ui/react';
import { OffsetShadow } from 'components/OffsetShadow';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { socialMediaLinks } from 'utils';

export const GetInTouchFooterCard = () => {
	const { t: translate } = useTranslation('landing');
	return (
		<OffsetShadow
			borderRadius="base"
			width={{ md: '35rem', lg: '51rem' }}
			height="7.688rem"
			top="8.438rem"
			left="0.5rem"
			borderColor="#09CFD6"
		>
			<Flex
				position="relative"
				top="32"
				zIndex="1"
				w={{ md: '35rem', lg: '51rem' }}
				h="7.688rem"
				borderRadius="base"
				bgGradient="linear(to-r, #1A94E1, #09CFD6)"
			>
				<Flex
					justify="center"
					align="center"
					boxSize="inherit"
					gap="12"
					zIndex="2"
					bgImage="/images/discord-pattern.svg"
					bgRepeat="no-repeat"
					bgPosition="right bottom"
					backgroundRepeat="no-repeat"
				>
					<Text fontSize={{ md: 'xl', lg: '3xl' }} fontWeight="bold">
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
		</OffsetShadow>
	);
};

export default GetInTouchFooterCard;
