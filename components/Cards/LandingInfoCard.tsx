import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';

interface ILandingInfoCard {
	title: string;
	text: string;
}

export const LandingInfoCard: React.FC<ILandingInfoCard> = ({
	title,
	text,
}) => {
	const theme = usePicasso();
	return (
		<Flex
			bg={theme.bg.primary}
			borderRadius="2xl"
			whiteSpace="normal"
			w="21.813rem"
			h="14.3rem"
		>
			<Flex direction="column" px="6" py="8" gap="6" flexWrap="wrap">
				<Text
					color={theme.text.white}
					fontSize="2xl"
					lineHeight="7"
					flexWrap="wrap"
				>
					{title}
				</Text>
				<Text color={theme.text.white} fontSize="sm">
					{text}
				</Text>
			</Flex>
		</Flex>
	);
};

export default LandingInfoCard;
