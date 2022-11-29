import { Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import React from 'react';

interface ISkeleton {
	display: 'flex' | 'none';
}

export const Skeletons: React.FC<ISkeleton> = ({ display }) => (
	<Flex
		gap="20"
		bg="white"
		p="3"
		display={display}
		align="center"
		justify="center"
	>
		<Flex gap="3" align="center">
			<SkeletonCircle size="6" />
			<Skeleton width="28" height="5" />
		</Flex>
		<Flex gap="3" align="center">
			<SkeletonCircle size="6" />
			<Skeleton width="28" height="5" />
		</Flex>
		<Flex gap="2" align="center">
			<SkeletonCircle size="4" />
			<Stack spacing="1">
				<Skeleton width="16" height="4" />
				<Skeleton width="10" height="3" />
			</Stack>
		</Flex>
		<Flex gap="3" direction="column">
			<Stack spacing="1" align="end">
				<Skeleton width="16" height="3" />
				<Skeleton width="10" height="3" />
			</Stack>
		</Flex>
	</Flex>
);

export default Skeletons;
