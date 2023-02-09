import { Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react';
import React from 'react';

export const HistorySkeletons = () => (
	<Flex bg="white" p="3" align="center" justify="space-between">
		<Flex gap="3" align="center">
			<SkeletonCircle size={{ md: '2', lg: '4', xl: '6' }} />
			<Skeleton
				width={{ md: '6', lg: '20', xl: '28' }}
				height={{ md: '2', lg: '2', xl: '5' }}
			/>
		</Flex>
		<Flex gap="3" align="center">
			<SkeletonCircle size={{ md: '2', lg: '4', xl: '6' }} />
			<Skeleton
				width={{ md: '6', lg: '20', xl: '28' }}
				height={{ md: '2', lg: '2', xl: '5' }}
			/>
		</Flex>
		<Flex gap="2" align="center">
			<SkeletonCircle size="4" />
			<Stack spacing="1">
				<Skeleton
					width={{ md: '6', lg: '14', xl: '16' }}
					height={{ md: '2', lg: '2', xl: '3' }}
				/>
				<Skeleton
					width={{ md: '6', lg: '8', xl: '10' }}
					height={{ md: '2', lg: '2', xl: '3' }}
				/>
			</Stack>
		</Flex>
		<Flex gap={{ md: '6', lg: '2', xl: '3' }} direction="column">
			<Stack spacing="1" align="end">
				<Skeleton
					width={{ md: '6', lg: '14', xl: '16' }}
					height={{ md: '2', lg: '2', xl: '3' }}
				/>
				<Skeleton
					width={{ md: '2', lg: '8', xl: '10' }}
					height={{ md: '2', lg: '2', xl: '3' }}
				/>
			</Stack>
		</Flex>
	</Flex>
);

export default HistorySkeletons;
