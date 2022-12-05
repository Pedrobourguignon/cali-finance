import { Button, Flex, Img, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';
import { OffsetShadow } from 'components/OffsetShadow';

export const ErrorAlert = () => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex
			align="center"
			h="max-content"
			direction={{ base: 'column', sm: 'row' }}
			bgColor="white"
		>
			<Flex>
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
						top="2"
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
