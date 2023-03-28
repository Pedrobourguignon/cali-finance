import { Button, Flex, Img, Text } from '@chakra-ui/react';
import {
	FrequentlyQuestions,
	GetInTouchFooterCard,
	GetStartedSession,
	LandingFooter,
	LandingInfoCard,
	OffsetShadow,
	PricingModelCard,
} from 'components';
import { NewLandingHeader } from 'components/Header';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const NewLandingContainer: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');
	return (
		<Flex
			minH="100vh"
			maxW="100%"
			bg={theme.bg.white}
			direction="column"
			backgroundImage="url('/images/stripss.svg')"
			backgroundRepeat="no-repeat"
			bgPosition="top right"
			bgSize={{ lg: '34.375rem', xl: '37.5rem' }}
		>
			<NewLandingHeader />
			<Flex justify={{ md: 'space-between', '2xl': 'center' }}>
				<Flex direction="column" gap="6" px="24" pt="28">
					<Flex direction="column" maxW={{ xl: '36.875rem', '2xl': '50rem' }}>
						<Text
							fontSize="5xl"
							color={theme.text.primary}
							fontWeight="bold"
							lineHeight="3.328rem"
							pb="6"
						>
							{translate('revolutionize')}
						</Text>
						<Text fontSize="md" color={theme.text.primary} lineHeight="1.21rem">
							{translate('withOur')}
						</Text>
					</Flex>
					<Flex pl="2">
						<OffsetShadow borderColor="#09CFD6" borderRadius="base" top="0rem">
							<Button
								_hover={{
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
								_active={{
									background: 'white',
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
								_focus={{}}
								h="2.75rem"
								position="relative"
								bottom="0.5rem"
								right="0.5rem"
								borderRadius="base"
								bgGradient={theme.gradients.landing}
								color={theme.text.primary}
								fontWeight="medium"
								fontSize="md"
								px="12"
								onClick={() =>
									window.open('https://califinance.ck.page/6455cc2350')
								}
							>
								{translate('joinWaitlist')}
							</Button>
						</OffsetShadow>
					</Flex>
				</Flex>
				<Flex display={{ base: 'none', lg: 'flex' }} minW="30rem" pt="20">
					<Img src="/images/mockup.svg" right="5" />
				</Flex>
			</Flex>
			<Flex
				h={{ md: 'full', '2xl': '53.125rem' }}
				px={{ md: '24', '2xl': '56' }}
				direction="column"
				backgroundImage="url('/images/curve-strip.svg')"
				backgroundRepeat="no-repeat"
				bgPosition="top left"
				bgSize={{ '2xl': 'cover' }}
				position="relative"
				top={{ md: '10', xl: '-24' }}
			>
				<Flex position="relative" top="24">
					<LandingInfoCard
						title={translate('payPerSecond')}
						text={translate('noMoreWaiting')}
					/>
				</Flex>
				<Flex justify="center" position="relative" top={{ md: '28', xl: '16' }}>
					<LandingInfoCard
						title={translate('customizablePayment')}
						text={translate('needToSetUp')}
					/>
				</Flex>
				<Flex
					justify="end"
					position="relative"
					top={{ md: '32', xl: '10' }}
					pb={{ md: '48', xl: '0' }}
				>
					<LandingInfoCard
						title={translate('decentralizedSystem')}
						text={translate('caliIsDecentralized')}
					/>
				</Flex>
			</Flex>
			<Flex px="24" pt={{ md: '10' }} justify="center">
				{/* <PricingModelCard /> */}
			</Flex>
			<Flex pt="20">
				<GetStartedSession />
			</Flex>
			<Flex w="full" justify="center" pt="40">
				<FrequentlyQuestions />
			</Flex>
			<Flex pt={{ md: '10', lg: '20' }} direction="column" align="center">
				<Flex pb="16" zIndex="1">
					<GetInTouchFooterCard />
				</Flex>
				<Flex w="full" zIndex="0">
					<LandingFooter />
				</Flex>
			</Flex>
		</Flex>
	);
};
