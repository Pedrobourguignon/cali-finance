import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const CoinCardSkeleton = () => {
	const theme = usePicasso();
	return (
		<Flex
			borderRadius="base"
			border="1px solid"
			bg={theme.bg.white}
			borderColor="gray.400"
			_hover={{ boxShadow: 'xl' }}
			pl="2"
			pt="2"
			transition="all 0.1s ease-in-out"
			w="28"
		>
			<Flex direction="column" w="max-content">
				<Flex align="center" gap="2">
					<SkeletonCircle size="6" />
					<Flex direction="column" gap="1">
						<Skeleton height="3" width="10" />
						<Skeleton height="3" width="4" />
					</Flex>
				</Flex>
				<Skeleton height="3" width="6" mt="2" />
			</Flex>
		</Flex>
	);
};

export default CoinCardSkeleton;
