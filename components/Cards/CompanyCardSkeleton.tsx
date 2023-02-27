import { Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

export const CompanyCardSkeleton = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');

	return (
		<Flex
			boxShadow="lg"
			bg="white"
			borderRadius="base"
			direction="column"
			gap={{ md: '1', lg: '2', xl: '4' }}
			w={{
				md: '8.288rem',
				lg: '10.5rem',
				xl: '13.813rem',
			}}
			h="8.375rem"
		>
			<Flex direction="column" pt="2.5" pl="4" color={theme.text.primary}>
				<Flex align="center" gap={{ md: '1', xl: '2' }} pt="1">
					<SkeletonCircle size="6" />
					<Skeleton h="3" w="32" />
				</Flex>
				<Flex pt={{ md: '1', xl: '3' }} justify="space-between" pr="6">
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color={theme.text.gray}>
							{translate('funds')}
						</Text>
						<Skeleton h="3" w="10" />
					</Flex>
					<Flex direction="column">
						<Text fontSize={{ md: 'xs', xl: 'sm' }} color={theme.text.gray}>
							{translate('members')}
						</Text>
						<Skeleton h="3" w="18" />
					</Flex>
				</Flex>
			</Flex>
			<Flex w="100%" align="center" justify="center" pb={{ lg: '2', xl: '4' }}>
				<Text
					color={theme.text.gray}
					bg="none"
					fontSize={{ md: 'xs' }}
					fontWeight="medium"
				>
					{translate('manage')}
				</Text>
			</Flex>
		</Flex>
	);
};

export default CompanyCardSkeleton;
