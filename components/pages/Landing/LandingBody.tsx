import { Flex, Icon, Text } from '@chakra-ui/react';
import { PrimaryButton } from 'components';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import { usePicasso } from 'hooks';

export const LandingBody = () => {
	const theme = usePicasso();
	return (
		<>
			<Flex justify="center" align="center" direction="column" flex="1">
				<Flex
					fontSize={{ base: '5xl', md: '5xl', lg: '5xl' }}
					textAlign="center"
					mb={{ base: '8', lg: '3.5' }}
					lineHeight="normal"
					flexDir="row"
					alignItems="center"
				>
					<Text>
						A new meaning of “
						<Text
							borderBottomWidth="0.25rem"
							borderBottomStyle="solid"
							borderColor={theme.branding.blue}
							pb="1"
							width="max-content"
							as="span"
						>
							time is money
						</Text>
						”
					</Text>
				</Flex>
				<Flex gap="8" flexDir="column" alignItems="center">
					<Flex
						fontSize="xl"
						textAlign="center"
						py="4"
						color="gray.400"
						flexDir="column"
					>
						<Text>No need for wait your payday anymore.</Text>
						<Text>Meet the future of payroll immerse on blockchain.</Text>
					</Flex>
					<Link href="/app">
						<PrimaryButton>
							<Text fontSize={{ base: '2xl', lg: '3xl' }}>Open app</Text>
						</PrimaryButton>
					</Link>
				</Flex>
			</Flex>
			<Flex display={{ base: 'flex', lg: 'none' }} mb="8" justify="center">
				<Flex>
					<Link href="/">
						<Icon as={FaDiscord} boxSize="10" />
					</Link>
				</Flex>
				<Flex ml="10">
					<Link href="/">
						<Icon as={FaTwitter} boxSize="10" />
					</Link>
				</Flex>
			</Flex>
		</>
	);
};

export default LandingBody;
