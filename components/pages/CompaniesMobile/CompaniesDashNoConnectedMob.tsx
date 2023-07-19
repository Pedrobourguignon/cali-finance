import { Button, Flex, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useAuth, usePicasso } from 'hooks';

import router from 'next/router';

export const CompaniesDashNoConnectedMob = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('companies');
	const { session } = useAuth();
	return (
		<Flex
			justify="space-between"
			bg={theme.bg.primary}
			py="6"
			px={{ md: '3', xl: '5', '2xl': '7' }}
			borderRadius="base"
			align="center"
			direction="column"
			gap="4"
		>
			<Flex w="full" justify="space-between" px="4">
				<Flex direction="column" justify="space-between">
					<Text
						fontSize={{ base: 'lg', md: 'sm', lg: 'xl', xl: '2xl' }}
						fontWeight="medium"
					>
						-
					</Text>
					<Text fontSize={{ base: 'xs', xl: 'sm' }} fontWeight="normal">
						{translate('companies')}
					</Text>
				</Flex>
				<Flex direction="column">
					<Text
						fontSize={{ base: 'lg', md: 'sm', lg: 'xl', xl: '2xl' }}
						fontWeight="medium"
					>
						-
					</Text>
					<Text fontSize={{ base: 'xs', xl: 'sm' }} fontWeight="normal">
						{translate('teams')}
					</Text>
				</Flex>
				<Flex direction="column">
					<Text
						fontSize={{ base: 'lg', md: 'sm', lg: 'xl', xl: '2xl' }}
						fontWeight="medium"
					>
						-
					</Text>
					<Text fontSize={{ base: 'xs', xl: 'sm' }} fontWeight="normal">
						{translate('members')}
					</Text>
				</Flex>
			</Flex>
			<Flex w="full" justify="space-between" px="4" align="center">
				<Flex direction="column">
					<Text
						fontSize={{ base: 'lg', md: 'sm', lg: 'xl', xl: '2xl' }}
						fontWeight="medium"
						minW={{ md: '20', lg: '24' }}
					>
						-
					</Text>
					<Text fontSize={{ base: 'xs', xl: 'sm' }} fontWeight="normal">
						{translate('totalFunds')}
					</Text>
				</Flex>
				<Button
					minW="9.813rem"
					bg={theme.bg.white}
					color={theme.text.primary}
					h="8"
					fontSize="sm"
					_active={{}}
					_focus={{}}
					_hover={{ opacity: '80%' }}
					onClick={() => router.push('/companies/create')}
				>
					{translate('createCompany')}
				</Button>
			</Flex>
		</Flex>
	);
};
