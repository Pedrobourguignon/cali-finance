import { Flex, Icon, Img, Text } from '@chakra-ui/react';
import { WithdrawsBar } from 'components/WithdrawsBar/WithdrawsBar';
import { usePicasso } from 'hooks';
import NextLink from 'next/link';
import { FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

export const UpgradeAccountBanner = () => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex bg={theme.bg.grey} direction="column" position="relative">
				<Flex direction="column" p="4" gap="12">
					<Flex w="64" bg="white">
						<WithdrawsBar />
					</Flex>
					<Flex direction="column" maxW="60" gap="2">
						<Text fontWeight="medium">Life is easier with Cali</Text>
						<Text fontSize="sm" fontWeight="normal">
							You’ve unlocked our all-in-one suit for surfacing unlimited teams
							and organizations payments
						</Text>
						<Flex gap="6">
							<NextLink href="/">
								<Icon
									boxSize="5"
									color={theme.branding.cyan}
									as={FiInstagram}
								/>
							</NextLink>
							<NextLink href="/">
								<Icon boxSize="5" color={theme.branding.cyan} as={FiLinkedin} />
							</NextLink>
							<NextLink href="/">
								<Icon boxSize="5" color={theme.branding.cyan} as={FiTwitter} />
							</NextLink>
						</Flex>
					</Flex>
				</Flex>
				<Flex position="absolute" top="440">
					<Img src="/images/illustration.png" />
				</Flex>
				<Img src="/images/Vector19.png" />
			</Flex>
		</Flex>
	);
};
