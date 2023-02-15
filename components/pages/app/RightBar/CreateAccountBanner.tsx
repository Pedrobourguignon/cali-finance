import { Flex, Button, Text, Img } from '@chakra-ui/react';
import { InfosBanner, OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const CreateAccountBanner = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('banners');

	return (
		<InfosBanner
			position="absolute"
			ilustrationImg="/images/illustration-big.svg"
			ondulatedImg="/images/bottom-big-wave.svg"
			bottom="0"
		>
			<Flex w="full">
				<Img src="/images/top-wave.svg" w="full" />
			</Flex>
			<Flex position="absolute" top="0" w="full">
				<Img src="/images/sparkles.svg" w="full" />
			</Flex>
			<Flex direction="column" pl="4" pt="10" pr="10">
				<Flex direction="column" gap="6">
					<Flex direction="column" gap="2">
						<Text fontWeight="medium" fontSize="md">
							{translate('createAccount')}
						</Text>
						<Text fontSize="sm" fontWeight="normal">
							{translate('unlock')}
						</Text>
					</Flex>
					<Flex gap="6">
						<OffsetShadow>
							<Button
								bg="white"
								borderRadius="base"
								color={theme.text.primary}
								fontSize="sm"
								boxSize="full"
								py="1.5"
								px="3"
								alignItems="center"
								gap="2"
								_focus={{}}
								_hover={{}}
								_active={{
									background: 'white',
									transform: 'translateY(0.25rem) translateX(0.25rem)',
								}}
							>
								<Img src="/images/star.png" boxSize="3.5" />
								{translate('createAccountButton')}
							</Button>
						</OffsetShadow>
					</Flex>
				</Flex>
			</Flex>
		</InfosBanner>
	);
};
