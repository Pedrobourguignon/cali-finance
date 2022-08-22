/* eslint-disable no-nested-ternary */
import { Flex, Text } from '@chakra-ui/react';
import { NotificationButton, ProfilePopover } from 'components';
import { useProfile } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SandwichMenu } from './SandwichMenu';

export const AppHeader: React.FC = () => {
	const { name } = useProfile();
	const { t: translate } = useTranslation('app-header');
	const [greeting, setGreeting] = useState<string>('');
	const router = useRouter();
	const pathName = router.defaultLocale;

	const greetingMessage = () => {
		const hour = new Date().getHours();
		if (pathName?.includes('en-us')) {
			return hour <= 5
				? setGreeting('Late at Night')
				: hour < 12
				? setGreeting('Good morning')
				: hour < 18
				? setGreeting('Good afternoon')
				: setGreeting('Good night');
		}

		return hour <= 5
			? setGreeting('Boa madrugada')
			: hour < 12
			? setGreeting('Bom dia')
			: hour < 18
			? setGreeting('Boa tarde')
			: setGreeting('Boa noite');
	};
	useEffect(() => {
		greetingMessage();
	}, []);

	return (
		<Flex
			minW="100vw"
			minH="20"
			flexDirection="row"
			justifyContent={{
				base: 'center',
				md: 'space-between',
			}}
			alignItems="center"
			color="white"
			mt="4"
			gap="6"
		>
			<Flex flexDirection="row" alignItems="center">
				<Flex
					direction={{ base: 'row', md: 'column' }}
					ml={{ base: '0', md: '40', xl: '40' }}
				>
					<Text
						fontSize={{ base: '3xl', xl: '2xl' }}
						whiteSpace="nowrap"
						display={{ base: 'none', sm: 'none', md: 'flex' }}
					>
						{translate('greeting', {
							greeting,
							name,
						})}
					</Text>
					<Text
						fontSize="md"
						display={{ base: 'none', sm: 'none', md: 'none', xl: 'flex' }}
						whiteSpace="nowrap"
					>
						{translate('assetInfo')}
					</Text>
				</Flex>
			</Flex>
			<Flex display={{ base: 'flex', sm: 'flex', md: 'none' }}>
				<SandwichMenu />
			</Flex>
			<Flex direction="row" gap="10">
				<Flex display={{ base: 'none', sm: 'none', md: 'flex' }}>
					<NotificationButton />
				</Flex>
				<Flex>
					<ProfilePopover />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AppHeader;
