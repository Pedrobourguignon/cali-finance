import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { NewLandingHeader } from 'components/Header';
import { usePicasso } from 'hooks';
import { LandingPage } from 'layouts';

export const NewLandingContainer: React.FC = () => {
	const theme = usePicasso();

	return (
		<Flex
			minH="100vh"
			maxW="100%"
			bg={theme.bg.gray2}
			direction="column"
			backgroundImage="url('/images/strips.svg')"
			backgroundRepeat="no-repeat"
			bgPosition="right"
		>
			<NewLandingHeader />
			<Flex>
				<Flex direction="column" bg="transparent" gap="6" px="24">
					<Text
						fontSize="5xl"
						color={theme.text.black}
						fontWeight="bold"
						lineHeight="3.328rem"
					>
						Revolutionize your business with real-time payroll payments
					</Text>
					<Text fontSize="xl" color={theme.text.black} lineHeight="1.21rem">
						With our pay-per-second technology, you can ensure that your
						employees get paid exactly when they&apos;ve earned it. Try it out
						now and experience the power of blockchain-based payroll automation.
					</Text>
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
							position="relative"
							bottom="0.5rem"
							right="0.5rem"
							borderRadius="base"
							bgGradient="linear(to-r, #09CFD6, #1A94E1)"
							color={theme.text.black}
							fontWeight="medium"
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
				<Flex display={{ base: 'none', lg: 'flex' }} minW="530px">
					<Img src="/images/mockupp.svg" right="5" bottom="5" />
				</Flex>
			</Flex>
		</Flex>
	);
};
