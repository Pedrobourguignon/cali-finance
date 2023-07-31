import { Button, Flex, Img, Link, Text } from '@chakra-ui/react';
import {
	FrequentlyQuestions,
	GetStartedSession,
	LandingFooter,
	LandingInfoCard,
	OffsetShadow,
	PricingModelCard,
	NewLandingMobileHeader,
	GetInTouchFooterCardMobile,
} from 'components';
import { usePath, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { navigationPaths, usefulLinks } from 'utils';
import NextLink from 'next/link';

interface IMenu {
	name: string;
	route: string;
}

export const NewLandingMobileContainer: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');
	const { isSamePath } = usePath();

	const menuOptions: IMenu[] = [
		{
			name: translate('about'),
			route: '/',
		},
		{
			name: translate('pricing'),
			route: navigationPaths.faq,
		},
		{
			name: translate('faq'),
			route: navigationPaths.faq,
		},
		{
			name: translate('contact'),
			route: navigationPaths.docs,
		},
		{
			name: translate('docs'),
			route: navigationPaths.docs,
		},
	];

	return (
		<Flex w="full" minH="100vh" bg="white" direction="column">
			<Flex w="full" px="4" pb="14">
				<NewLandingMobileHeader />
			</Flex>
			<Flex
				px="4"
				backgroundImage="url('/images/stripss.svg')"
				backgroundRepeat="no-repeat"
				bgPosition="top right"
				direction="column"
				pb="10"
			>
				<Text color={theme.text.primary} fontWeight="bold" fontSize="3xl">
					{translate('revolutionize')}
				</Text>
				<Flex px="4" pt="8" direction="column" align="center">
					<Img src="/images/mockup.svg" />
					<Text
						fontSize="xs"
						color={theme.text.primary}
						lineHeight="1.21rem"
						pt="6"
						pb="6"
					>
						{translate('withOur')}
					</Text>
					<Flex pl="2" w="full">
						<OffsetShadow
							borderColor="#09CFD6"
							borderRadius="base"
							width="full"
						>
							<Button
								w="full"
								h="2.75rem"
								position="relative"
								bottom="0.5rem"
								right="0.5rem"
								borderRadius="base"
								bgGradient={theme.gradients.landing}
								color={theme.text.primary}
								fontWeight="medium"
								fontSize="md"
								_hover={{
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
								_active={{
									background: 'white',
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
								_focus={{}}
								onClick={() => window.open(usefulLinks.joinOurWaitlist)}
							>
								{translate('joinWaitlist')}
							</Button>
						</OffsetShadow>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				pt="14"
				px="4"
				direction="column"
				backgroundImage="url('/images/curve-strip-2.svg')"
				backgroundRepeat="no-repeat"
			>
				<Flex gap="6" py="4" bg={theme.bg.white} justify="center">
					{menuOptions.map((item, index) => {
						const comparedPath = isSamePath(item.route);
						return (
							<Link key={+index} href={item.route} as={NextLink}>
								<Text
									color={theme.text.primary}
									fontWeight={comparedPath ? 'medium' : 'normal'}
									borderBottomColor={comparedPath ? theme.text.black : 'none'}
									borderBottomWidth={comparedPath ? '0.125rem' : 'none'}
									cursor="pointer"
								>
									{item.name}
								</Text>
							</Link>
						);
					})}
				</Flex>
				<Flex direction="column" gap="8" pt="8">
					<Flex w="full" justify={{ base: 'center', sm: 'start' }}>
						<LandingInfoCard
							title={translate('payPerSecond')}
							text={translate('noMoreWaiting')}
						/>
					</Flex>
					<Flex justify="center" position="relative" w="full">
						<LandingInfoCard
							title={translate('customizablePayment')}
							text={translate('needToSetUp')}
						/>
					</Flex>
					<Flex
						justify={{ base: 'center', sm: 'end' }}
						w="full"
						position="relative"
					>
						<LandingInfoCard
							title={translate('decentralizedSystem')}
							text={translate('caliIsDecentralized')}
						/>
					</Flex>
				</Flex>
			</Flex>
			<Flex justify="center" pt="28">
				<PricingModelCard />
			</Flex>
			<Flex pt="20">
				<GetStartedSession />
			</Flex>
			<Flex w="full" justify="center" pt="24">
				<FrequentlyQuestions />
			</Flex>
			<Flex
				pt={{ md: '10', lg: '20' }}
				direction="column"
				align="center"
				w="full"
			>
				<Flex pb="16" px="4">
					<GetInTouchFooterCardMobile />
				</Flex>
				<Flex w="full">
					<LandingFooter />
				</Flex>
			</Flex>
		</Flex>
	);
};
