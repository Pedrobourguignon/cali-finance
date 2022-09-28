import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { LandingHeader } from 'components/Header/Landing';
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
				justify="space-between"
				px="24"
			>
				<Flex direction="column" maxW="lg" gap="20">
					<Flex direction="column">
						<Text fontSize="6xl" fontWeight="extrabold">
							Your money,
						</Text>
						<Text
							fontSize="8xl"
							fontWeight="black"
							ml="9"
							mt="7"
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
							fontSize="8xl"
							fontWeight="black"
							ml="10"
							mt="8"
							position="absolute"
						>
							any time.
						</Text>
					</Flex>
					<Flex direction="column">
						<Text fontSize="xl">
							Companies, DAOs, and Freelancers use Cali to easily manage crypto
							invoices, salaries, and expenses in a fast, non-custodial, and
							compliant way.
						</Text>
						<Flex>
							<Flex
								border="1px solid white"
								borderRadius="sm"
								w="64"
								h="10"
								position="absolute"
								mt="9"
								ml="2"
							/>
							<Button
								_hover={{ background: 'white' }}
								_focus={{ background: 'white' }}
								_active={{
									background: 'white',
									transform: 'translateY(9px) translateX(8px)',
								}}
								borderRadius="sm"
								h="10"
								position="absolute"
								w="64"
								bg="white"
								color={theme.text.black}
								fontWeight="normal"
								fontSize="md"
								mt="7"
							>
								Book a Demo
							</Button>
						</Flex>
					</Flex>
				</Flex>
				<Flex>
					<Flex
						border="1px solid #02E4D1"
						borderRadius="sm"
						w="sm"
						h="72"
						position="absolute"
						mt="10"
						ml="12"
						zIndex="hidden"
					/>
					<Img src="/images/dashboard.svg" minW="sm" minH="72" zIndex="1" />
				</Flex>
			</Flex>
			<Flex
				bg={theme.bg.landing}
				w="100%"
				h="20vh"
				position="absolute"
				top="90%"
				clipPath="polygon(0 45%, 100% 0, 100% 100%, 0% 100%)"
			/>
		</LandingPage>
	);
};
