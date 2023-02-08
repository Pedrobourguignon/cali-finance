import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import { usePicasso, useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';

export const CompaniesDashboardNoConnected = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	const { isConnected } = useProfile();
	return (
		<Flex
			bg={theme.bg.primary}
			py="6"
			px="4"
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
					{translate('companies')}
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
					{translate('teams')}
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
					{translate('members')}
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
					{translate('totalFunds')}
				</Text>
			</Flex>
			<Flex flex="1">
				<OffsetButton
					name={translate('createCompany')}
					route="companies/create"
					disabled={!isConnected}
				/>
			</Flex>
		</Flex>
	);
};
