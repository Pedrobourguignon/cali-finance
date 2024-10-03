import {
	Button,
	Flex,
	IconButton,
	Img,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { usePath, usePicasso } from 'hooks';
import { navigationPaths, usefulLinks } from 'utils';
import NextLink from 'next/link';
import { HamburgerIcon } from '@chakra-ui/icons';
import useTranslation from 'next-translate/useTranslation';

interface IMenu {
	name: string;
	route: string;
}

export const NewLandingHeader: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');
	const { isSamePath } = usePath();

	const menuOptions: IMenu[] = [
		{
			name: translate('about'),
			route: '/',
		},
		{
			name: translate('pricing'),
			route: navigationPaths.faq,
		},
		{
			name: translate('faq'),
			route: navigationPaths.faq,
		},
		{
			name: translate('contactUs'),
			route: navigationPaths.docs,
		},
		{
			name: translate('docs'),
			route: navigationPaths.docs,
		},
	];

	return (
		<Flex
			pt="4"
			w="full"
			justify="space-between"
			align="center"
			bg="transparent"
		>
			<Link href={navigationPaths.landing} as={NextLink}>
				<Img minH="7" src="/images/logo-cali.svg" />
			</Link>
			<Flex display={{ base: 'flex', lg: 'none' }}>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<HamburgerIcon />}
						variant="outline"
						color="black"
					/>
					<MenuList bg={theme.bg.gray2} px="2">
						{menuOptions.map((item, index) => (
							<MenuItem
								key={+index}
								bg="transparent"
								_hover={{ bg: theme.text.primary, color: theme.text.white }}
							>
								<Link href={item.route} as={NextLink}>
									<Text color={theme.text.primary} cursor="pointer">
										{item.name}
									</Text>
								</Link>
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Flex>
			<Flex display={{ base: 'none', lg: 'flex' }} gap="6">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<Link key={+index} href={item.route} as={NextLink}>
							<Text
								color={theme.text.primary}
								fontWeight={comparedPath ? 'medium' : 'normal'}
								borderBottomColor={comparedPath ? theme.text.black : 'none'}
								borderBottomWidth={comparedPath ? '0.125rem' : 'none'}
								cursor="pointer"
							>
								{item.name}
							</Text>
						</Link>
					);
				})}
			</Flex>
			<Link
				href="/dashboard"
				textDecoration="none"
				_hover={{ textDecoration: 'none' }}
				as={NextLink}
				target="_blank"
			>
				<Button
					_hover={{ opacity: '80%' }}
					_focus={{
						border: '0.125rem solid white',
						color: 'white',
						bgColor: 'transparent',
					}}
					_active={{ color: 'black' }}
					_focusVisible={{}}
					_focusWithin={{}}
					borderRadius="base"
					bg={theme.text.black}
					border="0.125rem solid"
					borderColor="transparent"
					color={theme.text.white}
					px="9"
					h="2.75rem"
					fontSize="md"
					fontWeight="normal"
					textDecoration="none"
				>
					Launch App
				</Button>
			</Link>
		</Flex>
	);
};
