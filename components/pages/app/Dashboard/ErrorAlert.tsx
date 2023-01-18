import { Button, Flex, Img, Link, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const ErrorAlert = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex
			align="center"
			justify="center"
			w="100%"
			h="100vh"
			direction={{ base: 'column', sm: 'row' }}
			bg={theme.bg.white2}
			bgImage="/images/404-pattern.png"
			bgRepeat="no-repeat"
			bgPosition="left top"
			position="relative"
		>
			<Flex align="center">
				<Img src="/icons/error.svg" boxSize={{ base: '80', sm: '96' }} />
			</Flex>
			<Flex direction="column" gap="7">
				<Text
					fontSize={{ base: '5xl', sm: '6xl' }}
					fontWeight="bold"
					color={theme.text.black3}
				>
					{translate('oops')}
				</Text>
				<Text fontSize={{ base: 'xl', sm: '4xl' }} color={theme.text.black3}>
					{translate('somethingWentWrong')}
				</Text>
				<Link href="/">
					<OffsetShadow
						width="64"
						height="9"
						borderColor="black"
						top="0.5rem"
						left="0.375rem"
					>
						<Button
							_hover={{}}
							_focus={{ background: 'black' }}
							_active={{
								background: 'white',
								transform: 'translateY(0.4rem) translateX(0.4rem)',
							}}
							color="white"
							bg="black"
							fontSize="md"
							w="max-content"
							px="20"
						>
							{translate('backDashboard')}
						</Button>
					</OffsetShadow>
				</Link>
			</Flex>
		</Flex>
	);
};

export default ErrorAlert;
