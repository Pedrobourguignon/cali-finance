import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { LandingHeader, OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import { LandingPage } from 'layouts';

export const LandingContainer: React.FC = () => {
	const theme = usePicasso();

	return (
		<LandingPage>
			<LandingHeader />
			<Flex
				backgroundImage="url('/images/dollar-face.png')"
				backgroundRepeat="no-repeat"
				backgroundSize="cover"
				h="100vh"
				align="center"
				px={{ base: '5', lg: '10', xl: '24' }}
				direction={{ xs: 'column', md: 'row' }}
				gap="56"
				justify={{ base: 'center', lg: 'center' }}
			>
				<Flex direction="column" maxW="lg" gap="24">
					<Flex direction="column" position="relative">
						<Text
							fontSize={{ base: '4xl', sm: '6xl' }}
							fontWeight="extrabold"
							bgImage={theme.bg.gradient}
							bgClip="text"
							css={{ WebkitTextFillColor: 'transparent' }}
							width="max-content"
						>
							Your money,
						</Text>
						<Text
							fontSize={{ base: '6xl', sm: '8xl' }}
							fontWeight="black"
							top="30px"
							left="57px"
							position="absolute"
							zIndex="docked"
							bgImage={theme.bg.gradient}
							bgClip="text"
							css={{ WebkitTextFillColor: 'transparent' }}
							width="max-content"
						>
							any time.
						</Text>
						<Text
							css={{
								WebkitTextStroke: '1px #02E4D1',
							}}
							color="transparent"
							top="31px"
							left="55px"
							ml="1"
							fontSize={{ base: '6xl', sm: '8xl' }}
							fontWeight="black"
							position="absolute"
							width="max-content"
						>
							any time.
						</Text>
					</Flex>
					<Flex direction="column" gap="10">
						<Text fontSize={{ base: 'lg', sm: 'xl' }}>
							Companies, DAOs, and Freelancers use Cali to easily manage crypto
							invoices, salaries, and expenses in a fast, non-custodial, and
							compliant way.
						</Text>
						<Flex
							zIndex="docked"
							justify={{ base: 'center', lg: 'initial' }}
							direction={{ base: 'column', md: 'row' }}
							gap="10"
							align={{ base: 'center', lg: 'flex-start' }}
						>
							<OffsetShadow borderColor="white" borderRadius="sm" top="0rem">
								<Button
									_hover={{
										background: 'white',
										transform: 'translateY(0.5rem) translateX(0.5rem)',
									}}
									_focus={{ background: 'white' }}
									_active={{
										background: 'white',
										transform: 'translateY(0.5rem) translateX(0.5rem)',
									}}
									position="relative"
									bottom="0.5rem"
									right="0.5rem"
									borderRadius="sm"
									bg="white"
									color={theme.text.black}
									fontWeight="normal"
									fontSize="md"
									px="12"
									py="3"
									onClick={() =>
										window.open('https://califinance.ck.page/6455cc2350')
									}
								>
									Join our Waitlist
								</Button>
							</OffsetShadow>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					display={{ base: 'none', lg: 'flex' }}
					border="1px solid white"
					zIndex="docked"
					borderColor={theme.branding.cyan}
					maxW={{ base: '2xs', md: 'sm', lg: 'sm', xl: 'xl' }}
				>
					<Img
						src="/images/dashboard.png"
						position="relative"
						right="5"
						bottom="5"
						maxW={{ base: '2xs', md: 'sm', lg: 'sm', xl: 'xl' }}
					/>
				</Flex>
			</Flex>
		</LandingPage>
	);
};
