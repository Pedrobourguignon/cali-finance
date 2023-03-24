import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { useRouter } from 'next/router';
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
	const { locale } = useRouter();
	return (
		<Flex
			borderRadius="2xl"
			whiteSpace="normal"
			w="21.813rem"
			h="14.3rem"
			_hover={{ boxShadow: '2xl' }}
			backgroundImage="url('/images/landing-card-background.svg')"
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
		>
			<Flex
				direction="column"
				px="6"
				py="8"
				gap={locale === 'pt-BR' ? '4' : '6'}
				flexWrap="wrap"
			>
				<Text
					color={theme.text.white}
					fontSize={locale === 'pt-BR' ? 'xl' : '2xl'}
					lineHeight="7"
					flexWrap="wrap"
				>
					{title}
				</Text>
				<Text
					color={theme.text.white}
					fontSize={locale === 'pt-BR' ? 'xs' : 'sm'}
				>
					{text}
				</Text>
			</Flex>
		</Flex>
	);
};

export default LandingInfoCard;
