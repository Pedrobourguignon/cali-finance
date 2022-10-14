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
						>
							Your money,
						</Text>
						<Text
							fontSize={{ base: '6xl', sm: '8xl' }}
							fontWeight="black"
							top="7"
							left="12"
							position="absolute"
							zIndex="docked"
							bgImage={theme.bg.gradient}
							bgClip="text"
							css={{ WebkitTextFillColor: 'transparent' }}
						>
							any time.
						</Text>
						<Text
							css={{
								WebkitTextStroke: '1px #02E4D1',
							}}
							color="transparent"
							top="8"
							left="12"
							ml="1"
							fontSize={{ base: '6xl', sm: '8xl' }}
							fontWeight="black"
							position="absolute"
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
							display={{ sm: 'flex', lg: 'none' }}
							border="1px solid white"
							zIndex="docked"
							borderColor={theme.branding.cyan}
							maxW={{ base: '2xs', md: 'sm', lg: 'sm', xl: 'xl' }}
						>
							<Img
								src="/images/dashboard.svg"
								position="relative"
								right="5"
								bottom="5"
								maxW={{ base: '2xs', md: 'sm', lg: 'sm', xl: 'xl' }}
							/>
						</Flex>
						<Flex
							zIndex="docked"
							justify={{ base: 'center', lg: 'initial' }}
							direction={{ base: 'column', md: 'row' }}
							gap="10"
						>
							<OffsetShadow
								width="48"
								height="10"
								borderColor="white"
								top="0.5"
								left="0.5"
								borderRadius="sm"
							>
								<Button
									_hover={{ background: 'white' }}
									_focus={{ background: 'white' }}
									_active={{
										background: 'white',
										top: '0.5',
										left: '0.5',
									}}
									position="relative"
									bottom="2"
									right="2"
									borderRadius="sm"
									bg="white"
									color={theme.text.black}
									fontWeight="normal"
									fontSize="md"
									px="12"
									py="3"
								>
									Book a Demo
								</Button>
							</OffsetShadow>
							<Flex display={{ md: 'none', base: 'flex' }}>
								<OffsetShadow borderColor="white">
									<Button
										_hover={{ background: 'white' }}
										_focus={{ background: 'white' }}
										_active={{
											background: 'white',
											top: '0',
											left: '0',
										}}
										position="relative"
										display={{ base: 'flex', md: 'none' }}
										borderRadius="none"
										bg="white"
										color={theme.text.black}
										px="12"
										py="3"
										fontSize="md"
										fontWeight="normal"
									>
										Launch App
									</Button>
								</OffsetShadow>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					display={{ sm: 'none', lg: 'flex' }}
					border="1px solid white"
					zIndex="docked"
					borderColor={theme.branding.cyan}
					maxW={{ base: '2xs', md: 'sm', lg: 'sm', xl: 'xl' }}
				>
					<Img
						src="/images/dashboard.svg"
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
