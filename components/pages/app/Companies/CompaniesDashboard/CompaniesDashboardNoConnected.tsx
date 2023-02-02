import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso } from 'hooks';

export const CompaniesDashboardNoConnected = () => {
	const theme = usePicasso();
	return (
		<Flex
			bg={theme.bg.primary}
			py={{ md: '4', xl: '6', '2xl': '8' }}
			px={{ md: '3', xl: '4', '2xl': '7' }}
			borderRadius="base"
			align="center"
			minH="6.5rem"
		>
			<Flex direction="column" flex="1">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					Companies
				</Text>
			</Flex>
			<Flex direction="column" flex="1">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					Teams
				</Text>
			</Flex>
			<Flex direction="column" flex="1">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					Members
				</Text>
			</Flex>
			<Flex direction="column" flex="2">
				<Text fontSize="xl" fontWeight="medium">
					-
				</Text>
				<Text
					fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
					fontWeight="normal"
				>
					Total Funds
				</Text>
			</Flex>
			<Flex flex="2">
				<OffsetButton name="Create Company" route="companies/create" />
			</Flex>
		</Flex>
	);
};
