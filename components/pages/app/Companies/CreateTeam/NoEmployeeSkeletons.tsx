import { Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import React from 'react';

export const NoEmployeeSkeleton = () => (
	<Flex
		bg="white"
		px="4"
		py="2"
		align="center"
		justify="space-between"
		w="full"
		borderRadius="base"
	>
		<Flex gap="3" align="center">
			<SkeletonCircle size="6" />
			<Flex direction="column" gap="1">
				<Skeleton width="24" height="3" />

				<Flex gap="2">
					<Skeleton width="24" height="3" />
					<Skeleton width="3" height="3" />
				</Flex>
			</Flex>
		</Flex>

		<Flex gap="3" direction="column">
			<Stack spacing="1" align="end">
				<Flex gap="1">
					<Skeleton width="16" height="3" />
					<Skeleton width="8" height="3" />
				</Flex>
				<Skeleton width="6" height="3" />
			</Stack>
		</Flex>
	</Flex>
);

export default NoEmployeeSkeleton;
