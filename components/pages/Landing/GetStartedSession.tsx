import { Flex, Img, Text, Icon, Button } from '@chakra-ui/react';
import { OffsetShadow } from 'components/OffsetShadow';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { usefulLinks } from 'utils';

export const GetStartedSession = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');
	return (
		<Flex
			w="full"
			justify={{
				md: 'space-around',
				lg: 'center',
				xl: 'center',
			}}
			align="center"
			gap={{ md: '6', lg: '14', xl: '20', '2xl': '64' }}
			bgSize={{ base: '30rem', lg: '34.375rem', xl: '37.5rem' }}
			direction={{ base: 'column', sm: 'row' }}
		>
			<Flex direction="column" display={{ base: 'flex', sm: 'none' }}>
				<Flex direction="column" gap="8" align="center">
					<Text
						fontSize={{ base: '2xl', md: 'xl', lg: '3xl' }}
						fontWeight="semibold"
						color={theme.text.primary}
					>
						{translate('getStarted')}
					</Text>
					<Flex direction="column" gap="4" w="full">
						<Flex gap="3" align="center">
							<Icon as={BsCheckCircleFill} color="#A2A9B5" boxSize="5" />
							<Text
								color={theme.text.primary}
								fontSize={{ base: 'sm', lg: 'md' }}
							>
								{translate('easyToUse')}
							</Text>
						</Flex>
						<Flex gap="3" align="center">
							<Icon as={BsCheckCircleFill} color="#A2A9B5" boxSize="5" />
							<Text
								color={theme.text.primary}
								fontSize={{ base: 'sm', lg: 'md' }}
							>
								{translate('decentralizedSystem')}
							</Text>
						</Flex>
						<Flex gap="3" align="center">
							<Icon as={BsCheckCircleFill} color="#A2A9B5" boxSize="5" />
							<Text
								color={theme.text.primary}
								fontSize={{ base: 'sm', lg: 'md' }}
							>
								{translate('scalable')}
							</Text>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					backgroundImage="url('/images/circular-blur.svg')"
					backgroundRepeat="no-repeat"
					bgPosition="left"
					justify="center"
					bgSize="contain"
					py="10"
				>
					<Img
						src="/images/3d-mockups.svg"
						h={{ base: '18.75rem', lg: '27.5rem' }}
					/>
				</Flex>
				<Flex gap="4" direction={{ md: 'column', lg: 'row' }}>
					<Button
						h="2.75rem"
						_hover={{ opacity: 0.8 }}
						_active={{}}
						_focus={{}}
						bg={theme.text.primary}
						fontWeight="medium"
						fontSize="sm"
						w="full"
					>
						{translate('signUp')}
					</Button>
					<Flex pt="2" pl={{ md: '2', lg: '0' }}>
						<OffsetShadow
							borderColor="#09CFD6"
							borderRadius="base"
							width={{ base: 'full', lg: '' }}
						>
							<Button
								_hover={{
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
								_active={{
									background: 'white',
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
								_focus={{}}
								position="relative"
								bottom="0.5rem"
								right="0.5rem"
								borderRadius="base"
								bgGradient={theme.gradients.landing}
								color={theme.text.black}
								fontWeight="medium"
								fontSize="md"
								px="12"
								w="full"
								py="5"
								h="2.75rem"
								onClick={() => window.open(usefulLinks.joinOurWaitlist)}
							>
								{translate('bookADemo')}
							</Button>
						</OffsetShadow>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				direction={{ base: 'column', sm: 'row' }}
				display={{ base: 'none', sm: 'flex' }}
			>
				<Flex
					backgroundImage="url('/images/circular-blur.svg')"
					backgroundRepeat="no-repeat"
					bgPosition="left"
					bgSize="contain"
				>
					<Img
						src="/images/3d-mockups.svg"
						h={{ base: '18.75rem', lg: '27.5rem' }}
					/>
				</Flex>
				<Flex direction="column" gap="8">
					<Text
						fontSize={{ base: 'xl', lg: '3xl' }}
						fontWeight="semibold"
						color={theme.text.primary}
					>
						{translate('getStarted')}
					</Text>
					<Flex direction="column" gap="4">
						<Flex gap="3" align="center">
							<Icon as={BsCheckCircleFill} color="#A2A9B5" boxSize="5" />
							<Text
								color={theme.text.primary}
								fontSize={{ base: 'sm', lg: 'md' }}
							>
								{translate('easyToUse')}
							</Text>
						</Flex>
						<Flex gap="3" align="center">
							<Icon as={BsCheckCircleFill} color="#A2A9B5" boxSize="5" />
							<Text
								color={theme.text.primary}
								fontSize={{ base: 'sm', lg: 'md' }}
							>
								{translate('decentralizedSystem')}
							</Text>
						</Flex>
						<Flex gap="3" align="center">
							<Icon as={BsCheckCircleFill} color="#A2A9B5" boxSize="5" />
							<Text
								color={theme.text.primary}
								fontSize={{ base: 'sm', lg: 'md' }}
							>
								{translate('scalable')}
							</Text>
						</Flex>
					</Flex>
					<Flex gap="4" direction={{ md: 'column', lg: 'row' }}>
						<Button
							h="2.75rem"
							_hover={{ opacity: 0.8 }}
							_active={{}}
							_focus={{}}
							bg={theme.text.primary}
							fontWeight="medium"
							fontSize="sm"
							w="full"
						>
							{translate('signUp')}
						</Button>
						<Flex pt="2" pl={{ md: '2', lg: '0' }}>
							<OffsetShadow
								borderColor="#09CFD6"
								borderRadius="base"
								width={{ base: 'full', lg: '' }}
							>
								<Button
									_hover={{
										transform: 'translateY(0.5rem) translateX(0.5rem)',
									}}
									_active={{
										background: 'white',
										transform: 'translateY(0.5rem) translateX(0.5rem)',
									}}
									_focus={{}}
									position="relative"
									bottom="0.5rem"
									right="0.5rem"
									borderRadius="base"
									bgGradient={theme.gradients.landing}
									color={theme.text.black}
									fontWeight="medium"
									fontSize="md"
									px="12"
									w="full"
									py="5"
									h="2.75rem"
									onClick={() => window.open(usefulLinks.joinOurWaitlist)}
								>
									{translate('bookADemo')}
								</Button>
							</OffsetShadow>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default GetStartedSession;
