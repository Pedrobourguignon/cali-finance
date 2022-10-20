import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { StarIcon } from 'components/Icons';
import { OffsetShadow } from 'components/OffsetShadow';
import { usePicasso } from 'hooks';
import { ActiveTeamsBar } from '../ActiveTeamsBar';
import { InfosBanner } from '../InfosBanner';

export const UpgradeAccount = () => {
	const theme = usePicasso();
	return (
		<InfosBanner>
			<Flex direction="column" px="4" py="4" gap="14">
				<ActiveTeamsBar />
				<Flex direction="column" maxW="60" gap="5">
					<Flex direction="column" gap="2">
						<Text fontSize="md" fontWeight="medium">
							Upgrade Account
						</Text>
						<Text fontSize="sm" fontWeight="normal">
							Unlock our all-in-one suit for surfacing unlimited teams and
							organizations payments
						</Text>
					</Flex>
					<Flex px="2">
						<OffsetShadow
							borderRadius="base"
							width="32"
							height="10"
							borderColor="white"
							position="absolute"
						>
							<Button
								position="relative"
								borderRadius="base"
								bg="white"
								fontSize="sm"
								fontWeight="medium"
								bottom="0.5rem"
								right="0.5rem"
								color={theme.text.black}
								_hover={{ background: 'white' }}
								_focus={{ background: 'white' }}
								_active={{
									background: 'white',
									transform: 'translateY(0.5rem) translateX(0.5rem)',
								}}
							>
								<Icon as={StarIcon} color={theme.text.black} mr="2" />
								Upgrade Now
							</Button>
						</OffsetShadow>
					</Flex>
				</Flex>
			</Flex>
		</InfosBanner>
	);
};
