import { Flex, Text } from '@chakra-ui/react';
import { OffsetButton } from 'components';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';
import { useSession } from 'next-auth/react';

export const CompaniesDashboardNoConnected = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	const { data: session } = useSession();
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
					isDisabled={!session}
					_disabled={{ bg: 'white', cursor: 'not-allowed' }}
				/>
			</Flex>
		</Flex>
	);
};
