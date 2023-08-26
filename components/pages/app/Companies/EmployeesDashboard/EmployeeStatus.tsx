import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';

export const EmployeeStatus: React.FC<{ status?: number }> = ({ status }) => {
	const theme = usePicasso();

	const handleEmployeeStatus = () => {
		if (status === 1) {
			return {
				color: theme.branding.blue[600],
				bg: theme.branding.blue[50],
				text: 'Active',
			};
		}
		if (status === 0) {
			return {
				color: 'yellow.600',
				bg: 'orange.100',
				text: 'Pending - adding to contract',
			};
		}
		return {
			color: 'red.500',
			bg: 'red.100',
			text: 'Error - employee not added',
		};
	};
	return (
		<Flex
			w="11.3rem"
			rounded="full"
			h="5"
			align="center"
			justify="center"
			bg={handleEmployeeStatus().bg}
		>
			<Text
				color={handleEmployeeStatus().color}
				fontSize="xs"
				fontWeight="medium"
				textAlign="center"
			>
				{handleEmployeeStatus().text}
			</Text>
		</Flex>
	);
};
