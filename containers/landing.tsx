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
				backgroundImage="url('/images/dollar-face.svg')"
				backgroundRepeat="no-repeat"
				backgroundSize="cover"
				h="100vh"
				align="center"
				px={{ base: '5', lg: '10', xl: '24' }}
				direction={{ xs: 'column', md: 'row' }}
				justify={{ base: 'center', lg: 'space-between' }}
			>
				<Flex direction="column" maxW="lg" gap="40">
					<Flex direction="column">
						<Text fontSize={{ base: '4xl', sm: '6xl' }} fontWeight="extrabold">
							Your money,
						</Text>
						<Flex direction="column">
							<Text
								fontSize={{ base: '6xl', sm: '8xl' }}
								fontWeight="black"
								ml="2"
								mt="1"
								position="absolute"
								zIndex="docked"
							>
								any time.
							</Text>
							<Text
								css={{
									WebkitTextStroke: '1px #02E4D1',
								}}
								color="transparent"
								fontSize={{ base: '6xl', sm: '8xl' }}
								fontWeight="black"
								ml="3"
								mt="2"
								position="absolute"
							>
								any time.
							</Text>
						</Flex>
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
				<OffsetShadow borderColor={theme.branding.cyan}>
					<Img
						display={{ base: 'none', md: 'flex' }}
						src="/images/dashboard.svg"
						position="relative"
						right="5"
						bottom="5"
						maxW={{ base: 'sm', md: 'sm', lg: 'sm', xl: 'xl' }}
					/>
				</OffsetShadow>
			</Flex>
		</LandingPage>
	);
};
