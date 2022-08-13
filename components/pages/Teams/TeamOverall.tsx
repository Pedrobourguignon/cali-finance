import { Button, Divider, Flex, Img, Link, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const TeamOverall = () => {
	const theme = usePicasso();
	return (
		<Flex
			w="md"
			h="72"
			bg={theme.bg.primary}
			rounded="lg"
			p="5"
			direction="column"
		>
			<Flex w="full" direction="row" justify="space-between" mb="8">
				<Text fontWeight="Bold" fontSize="xl">
					My Assets
				</Text>
				<Text fontWeight="Bold" fontSize="xl" color={theme.text.gray}>
					$92,234.11
				</Text>
			</Flex>
			<Flex justify="space-between">
				<Flex>
					<Flex align="center" mr="2">
						<Img src="/images/cali-logo.svg" boxSize="6" />
					</Flex>
					<Flex direction="column">
						<Text fontSize="md">USD Coin</Text>
						<Text fontSize="sm" color={theme.text.gray}>
							USDC
						</Text>
					</Flex>
				</Flex>
				<Flex direction="column">
					<Text fontSize="md">USDC 84,238.11</Text>
					<Text fontSize="sm" color={theme.text.gray} align="end">
						$ 84,239.11
					</Text>
				</Flex>
			</Flex>
			<Divider bg={theme.bg.gray} mt="2" />
			<Button fontSize="sm" color={theme.text.gray} bg="transparent">
				See all
			</Button>
		</Flex>
	);
};

export default TeamOverall;
