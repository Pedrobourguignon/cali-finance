import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { LandingHeader } from 'components';
import { usePicasso } from 'hooks';
import { LandingPage } from 'layouts/LandingPage';

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
								zIndex="1"
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
							zIndex="999"
						>
							<Img
								src="/images/dashboard.svg"
								position="relative"
								right="5"
								bottom="5"
							/>
						</Flex>
						<Flex
							zIndex="999"
							justify={{ base: 'center', lg: 'initial' }}
							direction={{ base: 'column', md: 'row' }}
							gap="10"
						>
							<Button
								_hover={{ background: 'white' }}
								_focus={{ background: 'white' }}
								_active={{
									background: 'white',
									top: '2',
									left: '2',
									_after: {
										top: '0',
										left: '0',
									},
								}}
								_after={{
									content: '""',
									position: 'absolute',
									width: '100%',
									height: '100%',
									border: '1px solid white',
									borderRadius: 'sm',
									left: '2',
									top: '2',
									zIndex: '-1',
								}}
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
							<Button
								_hover={{ background: 'white' }}
								_focus={{ background: 'white' }}
								_active={{
									background: 'white',
									top: '2',
									left: '2',
									_after: {
										top: '0',
										left: '0',
									},
								}}
								display={{ base: 'flex', md: 'none' }}
								borderRadius="none"
								bg="white"
								color={theme.text.black}
								px="12"
								py="3"
								fontSize="md"
								fontWeight="normal"
								_after={{
									content: '""',
									position: 'absolute',
									width: '100%',
									height: '100%',
									border: '1px solid white',
									borderRadius: 'sm',
									left: '2',
									top: '2',
									zIndex: '-1',
								}}
							>
								Launch App
							</Button>
						</Flex>
					</Flex>
				</Flex>
				<Flex display={{ base: 'none', lg: 'flex' }} border="1px solid white">
					<Img
						src="/images/dashboard.svg"
						position="relative"
						right="5"
						bottom="5"
						maxW={{ base: 'sm', md: 'sm', lg: 'sm', xl: 'xl' }}
					/>
				</Flex>
			</Flex>
			<Flex
				bg={theme.bg.landing}
				w="100%"
				h="20vh"
				position="absolute"
				top="90%"
				clipPath="polygon(0 45%, 100% 0, 100% 100%, 0% 100%)"
				zIndex="hidden"
			/>
		</LandingPage>
	);
};
